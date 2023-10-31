
import bcrypt from "bcrypt";
import Schema from "./Schema.js";

const saltRounds = 8;

class UserSchema extends Schema { 
  
  static get yupSchema(){
    return this.yup.object().shape({
      email: this.yup.string().required().unique({ model: "User" }),
      cryptedPassword: this.yup.string().transform((value, originalValue) => {
        if (typeof originalValue === "string") {
          const cryptedPassword = bcrypt.hashSync(originalValue, saltRounds);
          return cryptedPassword
        }
        return value
      }).required()
    })
  }
}

export default UserSchema;