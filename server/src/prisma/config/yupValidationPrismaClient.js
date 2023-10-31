import { ValidationError } from "yup";

const mutativeActions = ["create", "update", "upsert", "createMany"];

class MissingSchemaError extends Error {}

const customMutativeQueries = {}
mutativeActions.forEach(action => {
  customMutativeQueries[action] = async ({ model, operation, args, query }) => {
    let modelSchema 
    try {
      const { default: schema } = await import(`./../validations/${model}Schema.js`)
      modelSchema = schema
    } catch (error) {
      if (error.code === "ERR_MODULE_NOT_FOUND") {
        throw new MissingSchemaError(`No schema for ${model} detected. Ensure you have defined a Yup schema for the ${model} model with the name '${model}Schema.js' in your validations folder.`)
      } 
      throw error
    }

    let transformedData;
    try {
      if (args.data instanceof Array) {
        await Promise.all(args.data.map(async dataObject => {
          return await modelSchema.yupSchema.validate(dataObject, { abortEarly: false });
        }))
      } else {
        transformedData = await modelSchema.yupSchema.validate(args.data, { abortEarly: false });
      }
    } catch (error) {
      throw new ValidationError(error.errors);
    }

    const transformedArgsData = { data: transformedData };
    return query(transformedArgsData);
  }
})

const yupValidationPrismaClient = {
  name: "YupValidationPrismaClient",
  query: {
    $allModels: customMutativeQueries
  },
};

export default yupValidationPrismaClient;
