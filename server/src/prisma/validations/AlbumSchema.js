import Schema from "./Schema.js";

class AlbumSchema extends Schema { 
  
  static get yupSchema(){
    return this.yup.object().shape({
      name: this.yup.string().required().unique({ model: "Album" }),
    })
  }
}

export default AlbumSchema;