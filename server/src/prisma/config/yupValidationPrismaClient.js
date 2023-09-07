import { ValidationError } from "yup";

const mutativeActions = ["create", "update", "upsert"];

const customMutativeQueries = {}
mutativeActions.forEach(action => {
  customMutativeQueries[action] = async ({ model, operation, args, query }) => {
    let transformedData;
    try {
      const { default: schema } = await import(`./../validations/${model}Schema.js`)
      transformedData = await schema.validate(args.data, { abortEarly: false });
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

