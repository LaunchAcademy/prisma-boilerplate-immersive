import yup from "yup";

const UserSchema = {
  modelName: "User",
  schema: yup.object().shape({
    email: yup.string().required(),
    cryptedPassword: yup.string().required(),
  }),
};

export default UserSchema;
