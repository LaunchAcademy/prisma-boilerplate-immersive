import prisma from "./prisma.js"

const main = async () => {
    const albums = await prisma.album.createMany({
        data: [
            {
                name: "The Good Life",
            },
            {
                name: "Help",
            }
        ]
    })

    const songs = await prisma.song.createMany({
        data: [
            {
                name: "Kick It To Me 3",
                plays: 11,
                isCool: true,
                description: "this is a great song",
                albumId: 1
            },
            {
                name: "Jackie Onasis 3",
                plays: 5,
                isCool: true,
                description: "technically also great",
                albumId: 1
            },
            {
                name: "Help 3",
                plays: 2,
                isCool: false,
                description: "oldie",
                albumId: 2
            }
        ]
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });