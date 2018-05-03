const emailRegx = /^[A-Za-z0-9.]+[@]{1}[A-Za-z0-9]+[.]{1}[A-Za-z0-9.]+$/;
const numberRegx = /^[0-9]+$/;
let maxMin = '^[a-zA-Z0-9]{min,max}$';
const alphaNumericWithSpaces = /^[a-zA-Z0-9 ]*$/; // alphaNumeric with spaces
const alphaNumericNoSpaces = /^[a-zA-Z0-9]*$/; // alphaNumeric with spaces
const ip = /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$/;
const password = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/; // The password must contain one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.
const urls = /^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/;
export default function validate(value: any, validation: any) {
  let outputError = { valid: true, errorMessages: {} };
  if (validation.constructor === Array) {
    validation.map((item: string, index: number) => {
      if (item.constructor === Object) {
        outputError = {
          ...outputError,
          errorMessages: {
            [Object.keys(item)[0]]: extractObjectError(item, value),
            ...outputError.errorMessages
          },
          valid: extractObjectError(item, value) ? false : outputError.valid
        };
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
  return outputError;
}

function extractObjectError(validation: any, value: string) {
  let customRegx;
  switch (Object.keys(validation)[0]) {
    case 'max':
      maxMin = maxMin.replace('min', '0');
      maxMin = maxMin.replace('max', validation[Object.keys(validation)[0]]);
      customRegx = new RegExp(maxMin);
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
    case 'digits':
      return numberRegx.test(value) ? undefined : 'only numbers';
    case 'alphaNumeric':
      return alphaNumericWithSpaces.test(value) ? undefined : 'invalid';
    case 'alphaNumericNoSpaces':
      return alphaNumericNoSpaces.test(value) ? undefined : 'invalid';
    case 'ip':
      return ip.test(value) ? undefined : 'invalid';
    case 'password':
      return password.test(value) ? undefined : 'invalid';
    case 'urls':
      return urls.test(value) ? undefined : 'invalid';
    default:
      return undefined;
  }
}
