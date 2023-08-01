import express from "express";
import passport from "passport";
import AuthService from "./../../../authentication/AuthService.js"

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  // const { email, password, passwordConfirmation } = req.body;
  try {
    // const persistedUser = await User.query().insertAndFetch({ email, password });
    const persistedUser = await AuthService.register(req.body)
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

export default usersRouter;
