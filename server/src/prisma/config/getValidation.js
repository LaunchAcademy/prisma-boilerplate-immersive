import allValidations from "../validations/index.js";

const getValidation = (nameOfModel) => {
  const schema = {};
  for (let schemaName in allValidations) {
    const modelName = allValidations[schemaName].modelName;
    schema[modelName] = allValidations[schemaName].schema;
  }
  return schema[nameOfModel];
};

export default getValidation;
