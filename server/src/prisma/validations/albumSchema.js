import yup from "yup";

const AlbumSchema = yup.object().shape({
  name: yup.string().required(),
})

export default AlbumSchema;
