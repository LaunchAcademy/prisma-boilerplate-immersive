import { createValidationMiddleware } from "prisma-validation-middleware";

const generateModelsToValidate = (validationSchema) => {
    const validationConfig = {}

    for (let modelName in validationSchema) {
        validationConfig[modelName] = (data) => {
            try {
                // abort early ensures all errors are present
                validationSchema[modelName].validateSync(data, { abortEarly: false, stripUnknown: true })
            } catch (error) {
                const customError = new Error(error.message)
                // add array of errors to object for retrieval
                customError.errors = error.errors
                throw customError
            }
        }
    }
    return validationConfig
}

const addYupValidationMiddleWare = (validationSchema) => {
    return createValidationMiddleware(
        generateModelsToValidate(validationSchema),
        {
            customizeError: (error, params) => {
                error.name = "YupValidationError";
                error.message = `${params.model}: ${error.errors.join(", ")}`
                return error;
            },
        }
    )
}

export default addYupValidationMiddleWare

