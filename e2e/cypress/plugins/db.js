const prisma = require("../../../server/src/prisma/prisma.js");
const truncateModel = require("../../../server/test/utils/truncateModel.js");

const truncate = async (models) => {
  let modelsToTruncate = models;
  if (!Array.isArray(modelsToTruncate)) {
    modelsToTruncate = [modelsToTruncate];
  }

  const modelString = modelsToTruncate.map((name) => `"public"."${name}"`).join(", ");
  await truncateModel(modelString);
  await prisma.$disconnect();
  return 1;
};

const insert = async ({ modelName, data }) => {
  const result = await prisma[modelName].create({ data });
  await prisma.$disconnect();
  return result;
};

const insertMany = async ({ modelName, data }) => {
  // cannot accept nested/ related associations for createMany
  const result = await prisma[modelName].createMany({ data });
  await prisma.$disconnect();
  return result;
};

const update = async ({ modelName, conditions = {}, data }) => {
  const result = await prisma[modelName].updateMany({ where: conditions, data });
  await prisma.$disconnect();
  return result;
};

const find = async ({ modelName, conditions = {} }) => {
  const result = await prisma[modelName].findMany({ where: conditions });
  await prisma.$disconnect();
  return result;
};

const deleteRecords = async ({ modelName, conditions = {} }) => {
  const result = await prisma[modelName].deleteMany({ where: conditions });
  await prisma.$disconnect();
  return result;
};

module.exports = {
  find,
  deleteRecords,
  insert,
  insertMany,
  truncate,
  update,
};
