/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from "bcrypt"
import prisma from "../prisma/prisma.js";

const saltRounds = 10;

class AuthService {
    static async register(data) {
        const { email } = data;
        
        const cryptedPassword = bcrypt.hashSync(data.password, 8);

        const user = await prisma.user.create({ 
            data: { 
                email: email,
                cryptedPassword: cryptedPassword
            }   
        })

        return user;
    }

    authenticate(password, cryptedPassword) {
        return Bcrypt.compareSync(password, cryptedPassword);
    }
}

export default AuthService