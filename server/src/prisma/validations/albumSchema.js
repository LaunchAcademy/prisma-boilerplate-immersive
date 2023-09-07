import yup from "yup";

const albumSchema = {
  modelName: "Album",
  schema: yup.object().shape({
    name: yup.string().required(),
  }),
};

export default albumSchema;
