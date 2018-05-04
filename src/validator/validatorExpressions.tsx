export default {
  emailRegx: /^[A-Za-z0-9.]+[@]{1}[A-Za-z0-9]+[.]{1}[A-Za-z0-9.]+$/,
  numberRegx: /^[0-9]+$/,
  maxMin: '^[a-zA-Z0-9]{min,max}$',
  alphaNumericWithSpaces: /^[a-zA-Z0-9 ]*$/, // alphaNumeric with spaces
  alphaNumericNoSpaces: /^[a-zA-Z0-9]*$/, // alphaNumeric with spaces
  ip: /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$/,
  password: /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/, // The password must contain one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.
  urls: /^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/,
  required: /^.+$/,
};
