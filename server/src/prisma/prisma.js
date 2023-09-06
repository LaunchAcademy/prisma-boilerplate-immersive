import { PrismaClient } from "@prisma/client";

import addYupValidationMiddleWare from "./validationSchema/config/addYupValidationMiddleWare.js";
import validations from "./validationSchema/validations.js"

const prisma = new PrismaClient();

prisma.$use(addYupValidationMiddleWare(validations))


export default prisma
