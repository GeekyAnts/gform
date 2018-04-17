const emailRegx = /^[A-Za-z0-9.]+[@]{1}[A-Za-z0-9]+[.]{1}[A-Za-z0-9.]+$/;
const numberRegx = /^[0-9]+$/;
const lettersRegx = /^[A-Za-z]+$/;
const max8Regx = /^[a-zA-Z0-9]{1,8}$/;

export default function validate(
  model: string,
  value: any,
  validation: any,
  errors: any
) {
  let outputError = { valid: true, errorMessages: {} };
  if (validation.constructor === Array) {
    validation.map((item: string, index: number) => {
      outputError = {
        ...outputError,
        errorMessages: {
          [item]: getErrorMessage(item, value),
          ...outputError.errorMessages
        },
        valid: getErrorMessage(item, value) ? false : outputError.valid
      };
    });
  } else if (validation.constructor === String) {
    outputError = {
      ...outputError,
      errorMessages: {
        [validation]: getErrorMessage(validation, value)
      },
      valid: getErrorMessage(validation, value) ? false : outputError.valid
    };
  }
  return outputError;
}
function getErrorMessage(validation: string, value: string) {
  switch (validation) {
    case 'email':
      return emailRegx.test(value) ? undefined : 'improper email';
    case 'number':
      return numberRegx.test(value) ? undefined : 'only numbers';
    case 'max8':
      return max8Regx.test(value) ? undefined : 'Max 8';
    case 'letters':
      return lettersRegx.test(value) ? undefined : 'only letters';
    default:
      return undefined;
  }
}
