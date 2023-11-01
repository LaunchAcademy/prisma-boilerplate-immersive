import prisma from "./prisma.js";

const main = async () => {
  console.log("Seeder");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
