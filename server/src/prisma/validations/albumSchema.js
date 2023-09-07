import yup from "yup";

const AlbumSchema = {
  modelName: "Album",
  schema: yup.object().shape({
    name: yup.string().required(),
  }),
};

export default AlbumSchema;
