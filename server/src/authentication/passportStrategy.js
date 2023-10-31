import local from "passport-local";

import prisma from "../prisma/prisma.js";
import AuthService from "./AuthService.js";

const authHandler = (email, password, done) => {
  prisma.user
    .findUnique({
      where: {
        email: email,
      },
    })
    .then((user) => {
      if (user) {
        if (AuthService.authenticate(password, user.cryptedPassword)) {
          return done(null, user);
        }

        return done(null, false, { message: "Invalid credentials" });
      }
      return done(null, false, { message: "Invalid credentials" });
    });
};

export default new local.Strategy({ usernameField: "email" }, authHandler);
