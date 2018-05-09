import ValidatorExpressions from './validatorExpressions';
export default function validate(value: any, validation: any) {
  let outputError = { valid: true, errorMessages: {} };
  if (validation.constructor === Array) {
    validation.map((item: any, index: number) => {
      if (item.constructor === Object) {
        outputError = {
          ...outputError,
          errorMessages: {
            ...extractObjectError(item, value),
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
      ValidatorExpressions.maxMin = ValidatorExpressions.maxMin.replace(
        'min',
        '0'
      );
      ValidatorExpressions.maxMin = ValidatorExpressions.maxMin.replace(
        'max',
        validation[Object.keys(validation)[0]]
      );
      customRegx = new RegExp(ValidatorExpressions.maxMin);
      return customRegx.test(value)
        ? undefined
        : { [Object.keys(validation)[0]]: 'max limit crossed' };
    case 'min':
      ValidatorExpressions.maxMin = ValidatorExpressions.maxMin.replace(
        'min',
        validation[Object.keys(validation)[0]]
      );
      ValidatorExpressions.maxMin = ValidatorExpressions.maxMin.replace(
        'max',
        ''
      );
      customRegx = new RegExp(ValidatorExpressions.maxMin);
      return customRegx.test(value)
        ? undefined
        : { [Object.keys(validation)[0]]: 'min limit not fulfilled' };
    case 'validationRule':
      return getErrorMessage(validation[Object.keys(validation)[0]], value)
        ? {
            [Object.keys(validation)[0]]: getErrorMessage(
              validation[Object.keys(validation)[0]],
              value
            )
          }
        : undefined;
    default:
      if (Object.keys(validation)[0].includes('customRegx')) {
        let userRegx = new RegExp(validation[Object.keys(validation)[0]]);
        return userRegx.test(value)
          ? undefined
          : { [Object.keys(validation)[0]]: 'Custom Regx no match' };
      } else if (Object.keys(validation)[0].includes('customFunction')) {
        if (typeof validation[Object.keys(validation)[0]] === 'function') {
          return validation[Object.keys(validation)[0]]()
            ? undefined
            : { [Object.keys(validation)[0]]: 'Custom function no match' };
        }
      }
      return undefined;
  }
}

function getErrorMessage(validation: string, value: string) {
  switch (validation) {
    case 'email':
      return ValidatorExpressions.emailRegx.test(value)
        ? undefined
        : 'improper email';
    case 'digits':
      return ValidatorExpressions.numberRegx.test(value)
        ? undefined
        : 'only numbers';
    case 'alphaNumeric':
      return ValidatorExpressions.alphaNumericWithSpaces.test(value)
        ? undefined
        : 'invalid';
    case 'alphaNumericNoSpaces':
      return ValidatorExpressions.alphaNumericNoSpaces.test(value)
        ? undefined
        : 'invalid';
    case 'ip':
      return ValidatorExpressions.ip.test(value) ? undefined : 'invalid';
    case 'password':
      return ValidatorExpressions.password.test(value) ? undefined : 'invalid';
    case 'urls':
      return ValidatorExpressions.urls.test(value) ? undefined : 'invalid';
    case 'required':
      return ValidatorExpressions.required.test(value) ? undefined : 'invalid';
    default:
      return undefined;
  }
}
