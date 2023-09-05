import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/albums",
  "/albums/new",
  "/albums/:id",
  "/songs",
  "/user-sessions/new",
  "/users/new",
  "/users/:id",
  "/users/:id/messages",
];

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
