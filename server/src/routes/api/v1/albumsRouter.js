import express from "express";

import prisma from "../../../prisma/prisma.js";

import cleanUserInput from "../../../services/cleanUserInput.js";
import uploadImage from "../../../services/uploadImage.js";

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
        songs: {
          orderBy: { id: "asc" },
        },
      },
    });

    return res.status(200).json({ album });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: error });
  }
});

albumsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  const { body, user } = req;
  const cleanedFormData = cleanUserInput(body);
  try {
    let image;
    if (req.file) {
      image = req.file.location;
    }
    const albumData = {
      ...cleanedFormData,
      userId: user.id,
      image,
    };
    const newAlbum = await prisma.album.create({ data: albumData });
    return res.status(201).json({ album: newAlbum });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

export default albumsRouter;
