import prisma from "../prisma/prisma.cjs";

export default async (id, done) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (user.cryptedPassword) {
    delete user.cryptedPassword;
  }

  done(null, user || false);
};
