import repl from "repl";
import { connection } from "./boot.js";

import prisma from "./prisma/prisma.cjs";

const replServer = repl.start({
  prompt: "> ",
});

replServer.context.prisma = prisma;
replServer.on("close", () => {
  connection.destroy();
});
