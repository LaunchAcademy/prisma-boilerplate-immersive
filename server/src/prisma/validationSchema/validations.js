import yup, { addMethod, Schema } from "yup"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const validationSchema = {
    Song: yup.object().shape({
        name: yup.string().required(),
        description: yup.string(),
        plays: yup
            .number()
            .integer()
            .transform((value) => (isNaN(value) ? undefined : value)) // Convert non-numeric values to undefined
            .nullable(true),
        isCool: yup.boolean().required(),
        albumId: yup.number().integer().required()
    }),
    Album: yup.object().shape({
        name: yup.string().required(),
    }),
    User: yup.object().shape({
        email: yup.string().required(),
        cryptedPassword: yup.string().required(),
    }),
}

export default validationSchema