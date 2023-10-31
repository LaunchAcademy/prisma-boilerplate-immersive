import express from "express";

import prisma from "../../../prisma/prisma.js";

import songVotesRouter from "./songVotesRouter.js";

const songsRouter = new express.Router();

songsRouter.use("/:songId/votes", songVotesRouter);

songsRouter.get("/", async (req, res) => {
  try {
    const songs = await prisma.song.findMany();

    return res.status(200).json({ songs: songs });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: error });
  }
});

songsRouter.patch("/:id", async (req, res) => {
  try {
    if (req.user) {
      // make sure a user is signed in, however no user is associated with a song
      const { id } = req.params;
      const { body } = req;
      const { name, isCool, plays, description } = body;

      const song = await prisma.song.update({
        where: { id: parseInt(id) },
        data: { name, isCool, plays, description },
        include: {
          votes: true,
          _count: {
            select: { votes: true },
          },
        },
      });
      song.totalVoteValue = song.votes.reduce((total, vote) => total + vote.value, 0);

      return res.status(200).json({ song });
    } else {
      return res.status(401).json({ message: "must be signed in" });
    }
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

songsRouter.delete("/:id", async (req, res) => {
  try {
    if (req.user) {
      const { id } = req.params;
      await prisma.song.delete({ where: { id: parseInt(id) } });
      return res.status(200).json({ message: "song deleted" });
    } else {
      return res.status(401).json({ message: "must be signed in" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: error });
  }
});

export default songsRouter;
