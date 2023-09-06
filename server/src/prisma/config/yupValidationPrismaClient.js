import validations from "./validations.js"
import { ValidationError } from "yup"

const yupValidationPrismaClient = {
    name: "YupValidationPrismaClient",
    query: {
        $allModels: {
            async create({ model, operation, args, query }) {
                let transformedData
                try {
                    transformedData = await validations(model).validate(args.data, { abortEarly: false });
                } catch (error) {
                    throw new ValidationError(error.errors);
                }

                const transformedArgsData = { data: transformedData }
                return query(transformedArgsData);
            },
            async update({ model, operation, args, query }) {
                let transformedData
                try {
                    transformedData = await validations(model).validate(args.data, { abortEarly: false });
                } catch (error) {
                    throw new ValidationError(error.errors);
                }

                const transformedArgsData = { data: transformedData }
                return query(transformedArgsData);
            },
            async upsert({ model, operation, args, query }) {
                let transformedData
                try {
                    transformedData = await validations(model).validate(args.data, { abortEarly: false });
                } catch (error) {
                    throw new ValidationError(error.errors);
                }

                const transformedArgsData = { data: transformedData }
                return query(transformedArgsData);
            },
        },
    },
}

export default yupValidationPrismaClient