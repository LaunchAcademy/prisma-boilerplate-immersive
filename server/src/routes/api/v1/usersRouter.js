import express from "express";
import { Prisma } from "@prisma/client";

import AuthService from "./../../../authentication/AuthService.js";
import prisma from "../../../prisma/prisma.js";

import userMessagesRouter from "./userMessagesRouter.js";

const usersRouter = new express.Router();

usersRouter.use("/:userId/messages", userMessagesRouter);

usersRouter.get("/:id", async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const userParamsId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: userParamsId,
      },
    });

    if (currentUserId) {
      user.messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: currentUserId, recipientId: userParamsId },
            { senderId: userParamsId, recipientId: currentUserId },
          ],
        },
        include: { sender: true },
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: error });
  }
});

usersRouter.post("/", async (req, res) => {
  // const { email, password, passwordConfirmation } = req.body;
  try {
    // const persistedUser = await User.query().insertAndFetch({ email, password });
    const persistedUser = await AuthService.register(req.body);
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(422)
          .json({ errors: { email: [{ message: "that email has already been taken" }] } });
      }
    }
    return res.status(422).json({ errors: error });
  }
});

export default usersRouter;
