import prisma from "./prisma.js";

const main = async () => {
  const kerrin = await prisma.user.upsert({
    where: { email: "kerrin@email.com" },
    update: {},
    create: {
      email: "kerrin@email.com",
      password: "password",
      albums: {
        create: {
          name: "Help",
          songs: {
            create: {
              name: "Help 3",
              plays: 2,
              isCool: false,
              description: "oldie",
            },
          },
        },
      },
    },
  });

  const nick = await prisma.user.upsert({
    where: { email: "nick@email.com" },
    update: {},
    create: {
      email: "nick@email.com",
      password: "password",
      albums: {
        create: {
          name: "The Good Life",
          songs: {
            create: [
              {
                name: "Kick It To Me",
                plays: 11,
                isCool: true,
                description: "this is a great song",
              },
              {
                name: "Jackie Onasis",
                plays: 5,
                isCool: true,
                description: "technically also great",
              },
            ],
          },
        },
      },
    },
  });

  console.log({ kerrin, nick });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
