// not used currently - can add to cypress truncate task
import prisma from "../prisma/prisma.js";

const getModelNames = async () => {
  try {
    const rawModelNames =
      await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`;

    const modelNames = Array.from(rawModelNames, (entry) => entry.table_name).filter(
      (name) => name !== "_prisma_migrations"
    );
    // console.log(modelNames);
    return modelNames;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default getModelNames;
