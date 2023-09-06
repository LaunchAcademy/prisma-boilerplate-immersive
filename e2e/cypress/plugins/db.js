const truncateModel = require("../../../server/test/utils/truncateModel.cjs");
const prisma = require("../../../server/test/helpers/prisma.cjs");

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

// const update = async ({ modelName, conditions = {}, json }) => {
//   // const result = await modelList[modelName].query().patch(json).where(conditions);
//   // await connection.client.pool.release();
//   // return result;
// };

// const find = async ({ modelName, conditions = {} }) => {
//   // const result = await modelList[modelName].query().where(conditions);
//   // await connection.client.pool.release();
//   // return result;
// };

// const deleteRecords = async ({ modelName, conditions = {} }) => {
//   // const result = await modelList[modelName].query().delete().where(conditions);
//   // await connection.client.pool.release();
//   // return result;
// };

module.exports = {
  // find,
  // deleteRecords,
  insert,
  truncate,
  // update,
};
