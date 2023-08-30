import express from "express";

import prisma from "../../../prisma/prisma.js";

import cleanUserInput from "../../../services/cleanUserInput.js";

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
      const { id } = req.params;
      const { body } = req;
      const cleanedFormData = cleanUserInput(body);
      const { name, isCool, plays, description } = cleanedFormData;

      const song = await prisma.song.update({
        where: { id: parseInt(id) },
        data: { name, isCool, plays, description },
      });
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
