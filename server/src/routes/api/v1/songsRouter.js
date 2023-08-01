import express from "express";
import prisma from "../../../prisma/prisma.js"

const songsRouter = new express.Router();

songsRouter.get("/", async (req, res) => {
    try {
      const songs = await prisma.song.findMany()

      return res.status(201).json({ songs: songs });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ errors: error });
    }
});

export default songsRouter;
