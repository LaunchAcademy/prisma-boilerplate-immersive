import yup from "yup";

const UserSchema = yup.object().shape({
  email: yup.string().required(),
  cryptedPassword: yup.string().required(),
})

export default UserSchema;
