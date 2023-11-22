import { PrismaClient } from "@prisma/client";

import yupValidationPrismaClient from "./config/yupValidationPrismaClient.js";

const prisma = new PrismaClient().$extends(yupValidationPrismaClient);

export default prisma;
