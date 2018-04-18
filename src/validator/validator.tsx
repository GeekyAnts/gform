const emailRegx = /^[A-Za-z0-9.]+[@]{1}[A-Za-z0-9]+[.]{1}[A-Za-z0-9.]+$/;
const numberRegx = /^[0-9]+$/;
const lettersRegx = /^[A-Za-z]+$/;
let maxMin = '^[a-zA-Z0-9]{min,max}$';
// const maxRegx = /^[a-zA-Z0-9]{min,max}$/;

export default function validate(value: any, validation: any) {
  let outputError = { valid: true, errorMessages: {} };
  if (validation.constructor === Array) {
    validation.map((item: string, index: number) => {
      if (item.constructor === Object) {
        console.log(item);
        outputError = {
          ...outputError,
          errorMessages: {
            [Object.keys(item)[0]]: extractObjectError(item, value),
            ...outputError.errorMessages
          },
          valid: extractObjectError(item, value) ? false : outputError.valid
        };
        console.log(outputError);
      } else if (item.constructor === String) {
        outputError = {
          ...outputError,
          errorMessages: {
            [item]: getErrorMessage(item, value),
            ...outputError.errorMessages
          },
          valid: getErrorMessage(item, value) ? false : outputError.valid
        };
      }
    });
  } else if (validation.constructor === Object) {
    outputError = {
      ...outputError,
      errorMessages: {
        [Object.keys(validation)[0]]: extractObjectError(validation, value),
        ...outputError.errorMessages
      },
      valid: extractObjectError(validation, value) ? false : outputError.valid
    };
  } else if (validation.constructor === String) {
    outputError = {
      ...outputError,
      errorMessages: {
        [validation]: getErrorMessage(validation, value)
      },
      valid: getErrorMessage(validation, value) ? false : outputError.valid
    };
  }
  console.log(outputError, validation);
  return outputError;
}

function extractObjectError(validation: any, value: string) {
  let customRegx;
  switch (Object.keys(validation)[0]) {
    case 'max':
      console.log('fsa', validation);
      maxMin = maxMin.replace('min', '0');
      maxMin = maxMin.replace('max', validation[Object.keys(validation)[0]]);
      customRegx = new RegExp(maxMin);
      console.log(customRegx.test(value));
      return customRegx.test(value) ? undefined : 'max limit crossed';
    case 'min':
      maxMin = maxMin.replace('min', validation[Object.keys(validation)[0]]);
      maxMin = maxMin.replace('max', '');
      customRegx = new RegExp(maxMin);
      return customRegx.test(value) ? undefined : 'min limit not fulfilled';
    case 'validationRule':
      return getErrorMessage(validation[Object.keys(validation)[0]], value);
    case 'customRegx':
      let userRegx = new RegExp(validation[Object.keys(validation)[0]]);
      return userRegx.test(value) ? undefined : 'No match';
    default:
      return undefined;
  }
}

function getErrorMessage(validation: string, value: string) {
  switch (validation) {
    case 'email':
      return emailRegx.test(value) ? undefined : 'improper email';
    case 'number':
      return numberRegx.test(value) ? undefined : 'only numbers';
    case 'letters':
      return lettersRegx.test(value) ? undefined : 'only letters';
    default:
      return undefined;
  }
}
