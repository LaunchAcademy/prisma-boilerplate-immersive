import repl from "repl";

import prisma from "./prisma/prisma.js";

const replServer = repl.start({
  prompt: "> ",
});

replServer.context.prisma = prisma;
replServer.on("close", async () => {
  await prisma.$disconnect();
});
