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
        user: true,
        songs: {
          orderBy: { id: "asc" },
          include: {
            votes: true,
            _count: {
              select: { votes: true },
            },
          },
        },
      },
    });
    // orderBy so that order is consistent, even after a record has been edited

    for (const song of album.songs) {
      song.totalVoteValue = song.votes.reduce((total, vote) => total + vote.value, 0);
    }
    // manually calculate total song value (look into aggregate?)
    // tried _sum and _avg, but both lead to query errors

    return res.status(200).json({ album });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: error });
  }
});

albumsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  if (req.user) {
    const { body, user } = req;
    const cleanedFormData = cleanUserInput(body);
    try {
      // VSCode yells with a parsing error with trying to use conditional chaining
      // image = req.file?.location;
      // so instead using a ternary to conditionally set image
      // is optional field, need to handle for case when req.file.location is undefined
      const albumData = {
        ...cleanedFormData,
        userId: user.id,
        image: req.file ? req.file.location : null,
      };
      const newAlbum = await prisma.album.create({ data: albumData });
      return res.status(201).json({ album: newAlbum });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ errors: error });
    }
  } else {
    return res.status(401).json({ message: "must be signed in" });
  }
});

export default albumsRouter;
