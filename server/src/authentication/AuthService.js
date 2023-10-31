/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from "bcrypt";
import prisma from "../prisma/prisma.js";

class AuthService {
  // replaced register by extending prisma

  static authenticate(password, cryptedPassword) {
    return bcrypt.compareSync(password, cryptedPassword);
  }
}

export default AuthService;
