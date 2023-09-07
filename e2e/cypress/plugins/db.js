const prisma = require("../../../server/src/prisma/prisma.cjs");
const getModelNames = require("../../../server/src/boot/getModelNames.cjs");
const truncateModel = require("../../../server/test/utils/truncateModel.cjs");

const truncate = async (models) => {
  const modelList = await getModelNames();
  let modelsToTruncate = models;
  if (!Array.isArray(modelsToTruncate)) {
    modelsToTruncate = [modelsToTruncate];
  }

  const modelString = modelsToTruncate.map((name) => `"public"."${name}"`).join(", ");
  // console.log("models", modelList);
  // console.log("model", modelString);
  // console.log("model???", modelList[modelString]);
  await truncateModel(modelString);
  // await truncateModel(modelList[modelString]);
  await prisma.$disconnect();
  return 1;
};

const insert = async ({ modelName, data }) => {
  const result = await prisma[modelName].create({ data });
  // just passing model to prisma allows flexibility on capitalization - user or User

  // const modelList = await getModelNames();
  // const result = await prisma[modelList[modelName]].create({ data });

  // can check against modelList to ensure included, however the same error message is thrown in both of these examples when an incorrect model is passed - users or test
  // only difference here is that capitalization will matter - User not user (from current object composition for modelList)
  // enforcing this remains consistent with how models are named in schema.prisma
  await prisma.$disconnect();
  return result;
};

const insertMany = async ({ modelName, data }) => {
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
  // const result = await modelList[modelName].query().delete().where(conditions);
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
