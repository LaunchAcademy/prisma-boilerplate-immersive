import { PrismaClient } from "@prisma/client";

import yupValidationPrismaClient from "./config/yupValidationPrismaClient.js";

// await prisma.song.create({ data: { name: "lets go6", isCool: true, plays: "2", albumId: "2" } })


const prisma = new PrismaClient().$extends(yupValidationPrismaClient);

export default prisma
