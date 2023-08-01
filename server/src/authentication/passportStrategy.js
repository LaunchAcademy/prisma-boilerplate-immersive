import local from "passport-local";

import prisma from "./../prisma/prisma.js"
import AuthService from "./AuthService.js"

const authHandler = (email, password, done) => {
  prisma.user.findUnique({
    where: {
      email: email
    }
  })
  .then((user) => {
    if (user) {
      if (AuthService.authenticate(password, user.cryptedPassword)){
        return done(null, user)
      }

      return done(null, false, { message: "Invalid credentials" });
    }
    return done(null, false, { message: "Invalid credentials" });
  })
};


  // User.query()
  //   .findOne({ email })
  //   .then((user) => {
  //     if (user) {
  //       if (user.authenticate(password)) {
  //         return done(null, user);
  //       }

  //       return done(null, false, { message: "Invalid credentials" });
  //     }
  //     return done(null, false, { message: "Invalid credentials" });
  //   });
  // return done(null, false, { message: "not configured" });

export default new local.Strategy({ usernameField: "email" }, authHandler);
