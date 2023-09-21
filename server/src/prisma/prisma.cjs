const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const saltRounds = 8;

const prisma = new PrismaClient().$extends({
  name: "encrypt user password",
  query: {
    user: {
      async create({ model, operation, args, query }) {
        const { data } = args;
        const cryptedPassword = bcrypt.hashSync(data.password, saltRounds);
        args.data.cryptedPassword = cryptedPassword;
        delete args.data.password;
        return query(args);
      },
      async createMany({ model, operation, args, query }) {
        const { data } = args;
        console.log("args", args);
        const cryptedPassword = bcrypt.hashSync(data.password, saltRounds);
        args.data.cryptedPassword = cryptedPassword;
        delete args.data.password;
        return query(args);
      },
      async upsert({ model, operation, args, query }) {
        const { where, create, update } = args;
        if (create) {
          const cryptedPassword = bcrypt.hashSync(create.password, saltRounds);
          create.cryptedPassword = cryptedPassword;
          delete create.password;
        }
        return query(args);
      },
    },
  },
});

module.exports = prisma;

// import bcrypt from "bcrypt";
// import { PrismaClient } from "@prisma/client";

// const saltRounds = 8;

// // extended user to encrypt password before create or upsert
// const prisma = new PrismaClient().$extends({
//   name: "encrypt user password",
//   query: {
//     user: {
//       async create({ model, operation, args, query }) {
//         const { data } = args;
//         const cryptedPassword = bcrypt.hashSync(data.password, saltRounds);
//         args.data.cryptedPassword = cryptedPassword;
//         delete args.data.password;
//         return query(args);
//       },
//       async createMany({ model, operation, args, query }) {
//         const { data } = args;
//         console.log("args", args);
//         const cryptedPassword = bcrypt.hashSync(data.password, saltRounds);
//         args.data.cryptedPassword = cryptedPassword;
//         delete args.data.password;
//         return query(args);
//       },
//       async upsert({ model, operation, args, query }) {
//         const { where, create, update } = args;
//         if (create) {
//           const cryptedPassword = bcrypt.hashSync(create.password, saltRounds);
//           create.cryptedPassword = cryptedPassword;
//           delete create.password;
//         }
//         return query(args);
//       },
//     },
//   },
// });

// export default prisma;
