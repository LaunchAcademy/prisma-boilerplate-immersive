import prisma from "../prisma/prisma.js";

export default async (id, done) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (user && user.cryptedPassword) {
    delete user.cryptedPassword;
  }

  done(null, user || false);
};
