import express from "express";

import prisma from "../../../prisma/prisma.js";

import cleanUserInput from "../../../services/cleanUserInput.js";

const albumSongsRouter = new express.Router({ mergeParams: true });

albumSongsRouter.post("/", async (req, res) => {
  const { body } = req;
  const cleanedFormData = cleanUserInput(body);
  const { name, isCool, plays, description } = cleanedFormData;
  const albumId = parseInt(req.params.albumId);

  try {
    const newSong = await prisma.song.create({
      data: { name, isCool, plays, description, albumId },
    });

    return res.status(201).json({ song: newSong });
  } catch (error) {
    console.log(error);

    return res.status(422).json({ errors: error });
  }
});

albumSongsRouter.patch("/", async (req, res) => {
  try {
    const { body } = req;
    const cleanedFormData = cleanUserInput(body);
    const { name, isCool, plays, description } = cleanedFormData;

    const song = await prisma.song.update({
      where: { id: body.id },
      data: { name, isCool, plays, description },
    });
    return res.status(200).json({ song });
  } catch (error) {
    console.log(error);

    return res.status(422).json({ errors: error });
  }
});

export default albumSongsRouter;
