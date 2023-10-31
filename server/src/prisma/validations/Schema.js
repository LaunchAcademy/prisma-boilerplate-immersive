import yup, { Schema as yupSchema } from "yup";
import prisma from "../prisma.js"

class Schema { 
  static get yup(){
    // args = { model: string, message: string}
     yup.addMethod(yupSchema, 'unique', function(args) {
      return this.test('unique', 
        (label) => args.message ? args.message : `"${label.value}" is already in use for "${label.path}"`, 
        function (value) {
          if (args === "undefined" || args.model === undefined) {
            const { createError } = this;
            return createError({ message: `A model name must be designated when using "unique"`})
          }
          const validatedField = this.path
          return new Promise((resolve, reject) => {
            const model = args.model
            prisma[model].findUnique({
              where: {
                [validatedField]: value
              },
            }).then((result) => {
              return !result ? resolve(true) : resolve(false)
            })
          })      
      })
    });

    return yup
  }
}

export default Schema