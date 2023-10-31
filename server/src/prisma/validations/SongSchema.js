import Schema from "./Schema";

class SongSchema extends Schema { 

  static get yupSchema(){
    return this.yup.object().shape({
      name: this.yup.string().required().unique({ model: "Song" }),
      description: this.yup.string(),
      plays: this.yup
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
      isCool: this.yup
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
      albumId: this.yup
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
  }
}

export default SongSchema;