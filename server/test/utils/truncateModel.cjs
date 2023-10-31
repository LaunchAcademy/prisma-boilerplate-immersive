const prisma = require("../../src/prisma/prisma.js");

module.exports = async function truncateModel(modelString) {
  if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "e2e") {
    throw Error(
      "don't use table truncation test utility script outside of the 'test' node environment",
    );
  }

  try {
    if (modelString) {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${modelString} CASCADE;`);
    }
  } catch (error) {
    console.error({ error });
  }
};