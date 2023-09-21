import express from "express";

import prisma from "../../../prisma/prisma.cjs";

import cleanUserInput from "../../../services/cleanUserInput.js";

const albumSongsRouter = new express.Router({ mergeParams: true });

albumSongsRouter.post("/", async (req, res) => {
  const { body } = req;
  const cleanedFormData = cleanUserInput(body);
  const { name, isCool, plays, description } = cleanedFormData;
  const albumId = parseInt(req.params.albumId);
  // prisma steps in with validation before postgres can type coerce, have to manually parse to int

  try {
    const newSong = await prisma.song.create({
      data: { name, isCool, plays, description, albumId },
      include: {
        votes: true,
        _count: {
          select: { votes: true },
        },
      },
    });
    newSong.totalVoteValue = 0;
    // consider serializer/ method for calculating vote values
    // include all votes
    // count the number of votes
    // calculate total vote value (just created, so will be 0, no votes)

    return res.status(201).json({ song: newSong });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

export default albumSongsRouter;
