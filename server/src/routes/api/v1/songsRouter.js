import express from "express";
import prisma from "../../../prisma/prisma.js";

const songsRouter = new express.Router();

songsRouter.get("/", async (req, res) => {
  try {
    const songs = await prisma.song.findMany();

    return res.status(200).json({ songs: songs });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: error });
  }
});

songsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.song.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: "song deleted" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: error });
  }
});

export default songsRouter;
