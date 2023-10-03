import { ValidationError } from "yup";

const mutativeActions = ["create", "update", "upsert", "createMany"];

class MissingSchemaError extends Error {}


// test with createMany: we may need to account for arrays! 

const customMutativeQueries = {}
mutativeActions.forEach(action => {
  customMutativeQueries[action] = async ({ model, operation, args, query }) => {
    let modelSchema 
    try {
      const { default: schema } = await import(`./../validations/${model}Schema.js`)
      modelSchema = schema
    } catch (error) {
      throw new MissingSchemaError(`No schema for ${model} detected. Ensure you have defined a Yup schema for the ${model} model with the name '${model}Schema.js' in your validations folder.`)
    }

    let transformedData;
    try {
      transformedData = await modelSchema.yupSchema.validate(args.data, { abortEarly: false });
    } catch (error) {
      console.log("strange errors", error)
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

