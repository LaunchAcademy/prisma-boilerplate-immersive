import express from "express";

import prisma from "../../../prisma/prisma.js";

import cleanUserInput from "../../../services/cleanUserInput.js";

const songVotesRouter = new express.Router({ mergeParams: true });

songVotesRouter.post("/", async (req, res) => {
  if (req.user) {
    const { body, user } = req;
    const songId = parseInt(req.params.songId);

    const cleanedFormData = cleanUserInput(body);
    const { voteValue } = cleanedFormData;

    const songQuery = prisma.song.findUnique({
      where: {
        id: songId,
      },
      include: {
        votes: true,
        _count: {
          select: { votes: true },
        },
      },
    });

    try {
      // find vote for that user and song
      const vote = await prisma.vote.findFirst({
        where: {
          songId: songId,
          userId: user.id,
        },
      });
      if (vote && vote.value === voteValue) {
        // delete if same
        await prisma.vote.delete({ where: { id: vote.id } });
        const song = await songQuery;
        song.totalVoteValue = song.votes.reduce((total, vote) => total + vote.value, 0);
        return res.status(200).json({ song, message: "vote deleted" });
      } else if (vote) {
        // update value if exists
        const updatedVote = await prisma.vote.update({
          where: { id: vote.id },
          data: { value: voteValue },
        });
        const song = await songQuery;
        song.totalVoteValue = song.votes.reduce((total, vote) => total + vote.value, 0);
        return res.status(200).json({ song: song, vote: updatedVote });
      } else if (!vote) {
        // create new if none
        const newVote = await prisma.vote.create({
          data: { userId: user.id, songId, value: voteValue },
        });
        const song = await songQuery;
        song.totalVoteValue = song.votes.reduce((total, vote) => total + vote.value, 0);
        return res.status(201).json({ song: song, vote: newVote });
      }
    } catch (error) {
      console.log(error);
      return res.status(422).json({ errors: error });
    }
  } else {
    return res.status(401).json({ message: "must be signed in" });
  }
});

export default songVotesRouter;
