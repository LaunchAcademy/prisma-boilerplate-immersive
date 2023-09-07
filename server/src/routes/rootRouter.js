import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import songsRouter from "./api/v1/songsRouter.js";
import albumsRouter from "./api/v1/albumsRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/songs", songsRouter);
rootRouter.use("/api/v1/albums", albumsRouter);

rootRouter.use("/", clientRouter);

export default rootRouter;
