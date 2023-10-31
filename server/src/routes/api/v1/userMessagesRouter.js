import express from "express";
import prisma from "../../../prisma/prisma.cjs";

const userMessagesRouter = new express.Router({ mergeParams: true });

userMessagesRouter.get("/", async (req, res) => {
  try {
    const userParamsId = parseInt(req.params.userId);

    // find user
    // include all sent and received messages
    // select recipient of all messages I've sent - select just id and email
    // select sender of all messages I've received - just id and email
    // make each query distinct to try to find unique conversations
    const user = await prisma.user.findUnique({
      where: { id: userParamsId },
      include: {
        sentMessages: {
          select: {
            recipient: { select: { id: true, email: true } },
          },
          distinct: ["senderId", "recipientId"],
        },
        receivedMessages: {
          select: {
            sender: { select: { id: true, email: true } },
          },
          distinct: ["senderId", "recipientId"],
        },
      },
    });

    // all recipients of messages I've sent (removing extra `recipient` key from objects in array)
    const usersSentTo = user.sentMessages.map((m) => m.recipient);
    // all senders of messages I've received
    const usersReceivedFrom = user.receivedMessages.map((m) => m.sender);

    // plan to keep all sent messages, add unique received
    // filter through all users I received messages from
    // from users I've sent messages to, see if I have sent a message to that user
    // if not, add them to the new array uniqueReceived
    const uniqueReceived = usersReceivedFrom.filter((receivedUser) => {
      return !usersSentTo.find((sentUser) => sentUser.id == receivedUser.id);
    });
    // merge users I've sent to with the filtered unique users I received messages from
    const uniqueConversations = usersSentTo.concat(uniqueReceived);

    return res.status(200).json({ messages: uniqueConversations });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: error });
  }
});

userMessagesRouter.post("/", async (req, res) => {
  if (req.user) {
    const currentUser = req.user;
    const { body } = req;
    const userId = parseInt(req.params.userId);

    try {
      const newMessage = await prisma.message.create({
        data: { body, senderId: currentUser.id, recipientId: userId },
        include: { sender: true },
      });

      return res.status(201).json({ message: newMessage });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ errors: error });
    }
  } else {
    return res.status(401).json({ message: "must be signed in" });
  }
});

export default userMessagesRouter;
