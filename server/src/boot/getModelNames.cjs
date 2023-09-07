const prisma = require("../prisma/prisma.cjs");

module.exports = async function getModelNames() {
  try {
    const rawModelNames =
      await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`;

    const modelNames = rawModelNames.reduce((acc, obj) => {
      if (obj.table_name !== "_prisma_migrations") {
        acc[obj.table_name] = obj.table_name;
      }
      return acc;
    }, {});

    return modelNames;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
