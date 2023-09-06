import yup from "yup"
import { ValidationError } from "yup"

const songSchema = {
    modelName: "Song",
    schema: yup.object().shape({
        name: yup.string().required(),
        description: yup.string(),
        plays: yup.mixed().transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
                const parsedValue = parseInt(originalValue, 10);
                if (!isNaN(parsedValue)) {
                    return parsedValue;
                } 
            }
            return value;
        }).nullable(true),
        isCool: yup.mixed().transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
                if (originalValue === 'true') {
                    return true;
                } else if (originalValue === 'false') {
                    return false;
                }
            }
            return value;
        }).required(),
        albumId: yup.mixed().transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
                const parsedValue = parseInt(originalValue, 10);
                if (!isNaN(parsedValue)) {
                    return parsedValue;
                }
            }
            return value;
        }).required(),
        albumId: yup.mixed().transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
                const parsedValue = parseInt(originalValue, 10);
                if (!isNaN(parsedValue)) {
                    return parsedValue;
                }
            }
            return value;
        }).required()
    })
}


export default songSchema