import express from "express";
import prisma from "../../../prisma/prisma.js";

const albumSongsRouter = new express.Router({ mergeParams: true });

albumSongsRouter.post("/", async (req, res) => {
  const { body } = req;
  const albumId = req.params.albumId;

  try {
    const newSong = await prisma.song.create({
      data: { ...body, albumId },
      include: {
        votes: true,
        _count: {
          select: { votes: true },
        },
      },
    });
    newSong.totalVoteValue = 0;

    return res.status(201).json({ song: newSong });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

export default albumSongsRouter;
