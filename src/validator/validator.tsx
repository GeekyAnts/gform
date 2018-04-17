const emailRegx = /^[A-Za-z0-9.]+[@]{1}[A-Za-z0-9]+[.]{1}[A-Za-z0-9.]+$/;
const numberRegx = /^[0-9]+$/;
const lettersRegx = /^[A-Za-z.]+$/;
const max8Regx = /^[a-zA-Z0-9]{1,8}$/;
import * as _ from 'lodash';
// var _ = require('lodash');
export default function validate(
  model: string,
  value: any,
  validation: any,
  errors: any
) {
  if (validation.constructor === Array) {
    let errArr: any = [];
    validation.map((item: any, _index: number) => {
      getErrorMessage(item, value)
        ? errArr.push(getErrorMessage(item, value))
        : undefined;
    });
    let error = {};
    // _.setWith(error, error[model], {
    //   valid: errArr.length > 0 ? false : true,
    //   errorMessage: errArr
    // });
    // console.log(error, 'check');
    return {
      errors: {
        ...errors,
        [model]: {
          valid: errArr.length > 0 ? false : true,
          errorMessage: errArr
        }
      }
    };
  } else if (validation.constructor === String) {
    return evaluateConditions(validation, errors, model, value);
  }
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
function evaluateConditions(
  validation: string,
  errors: any,
  model: any,
  value: string
) {
  switch (validation) {
    case 'email':
      return getErrors(
        errors,
        model,
        emailRegx,
        value,
        'improper email',
        validation
      );
    case 'number':
      return getErrors(
        errors,
        model,
        numberRegx,
        value,
        'only numbers',
        validation
      );
    case 'max8':
      return getErrors(
        errors,
        model,
        max8Regx,
        value,
        'max8 allowed',
        validation
      );
    case 'letters':
      return getErrors(
        errors,
        model,
        lettersRegx,
        value,
        'only letters allowed',
        validation
      );
      return errors;
  }
}

function getErrors(
  errors: any,
  model: any,
  regX: any,
  value: string,
  errorMessage: string,
  validation: string
) {
  let arr = errors[model] ? errors[model].errorMessage : [];
  regX.test(value)
    ? arr.includes(errorMessage)
      ? arr.splice(arr.indexOf(errorMessage), 1)
      : arr
    : arr.includes(errorMessage)
      ? arr
      : arr.push(errorMessage);
  return {
    errors: {
      ...errors,
      [model]: {
        valid: arr.length > 0 ? false : true,
        errorMessage: arr
      }
    }
  };
}
