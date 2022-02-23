import { toastWarning } from "../toaster";

/**
 * custom hook to validate object and shoe popup on validation error
 * @param {JoiValidationSchema}  schema
 * @param {object} dataTovalid
 * @return {boolean} false or true
 * */
export const validationChecker = (schema, dataTovalid) => {
  const { error } = schema.validate(dataTovalid);
  if (error?.details.length > 0) {
    for (let i = 0; i < error?.details.length || 0; i++) {
      toastWarning(error[i].context.label);
      break;
    }
    return false;
  } else return true;
};
