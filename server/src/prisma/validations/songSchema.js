import yup from "yup";

const SongSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    plays: yup
      .number()
      .integer()
      .transform((value, originalValue) => {
        if (typeof originalValue === "string") {
          const parsedValue = parseInt(originalValue, 10);
          if (!isNaN(parsedValue)) {
            return parsedValue;
          }
        }
        return value;
      })
      .nullable(true),
    isCool: yup
      .boolean()
      .transform((value, originalValue) => {
        if (typeof originalValue === "string") {
          if (originalValue === "true") {
            return true;
          } else if (originalValue === "false") {
            return false;
          }
        }
        return value;
      })
      .required(),
    albumId: yup
      .number()
      .integer()
      .transform((value, originalValue) => {
        if (typeof originalValue === "string") {
          const parsedValue = parseInt(originalValue, 10);
          if (!isNaN(parsedValue)) {
            return parsedValue;
          }
        }
        return value;
      })
      .required(),
  })

export default SongSchema;
