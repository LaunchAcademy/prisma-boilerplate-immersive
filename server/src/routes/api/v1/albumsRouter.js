import express from "express";

import prisma from "../../../prisma/prisma.js";

import albumSongsRouter from "./albumSongsRouter.js";

const albumsRouter = new express.Router();

albumsRouter.use("/:albumId/songs", albumSongsRouter);

albumsRouter.get("/", async (req, res) => {
  try {
    const albums = await prisma.album.findMany();

    return res.status(200).json({ albums });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: error });
  }
});

albumsRouter.get("/:id", async (req, res) => {
  try {
    const album = await prisma.album.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        songs: true,
      },
    });

    return res.status(200).json({ album });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: error });
  }
});

export default albumsRouter;
