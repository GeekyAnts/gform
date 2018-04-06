import * as React from "react";
import FormField from "./FormField";
export default interface Form {
  $pristine: boolean;
  $dirty: boolean;
  $invalid: boolean;
  $valid: boolean;
  $submitted: boolean;
  fields: FormFields;
  ui: UIs;
  map: (field: string) => {};
};

interface FormFields {
  [key: string]: FormField;
}

interface UIs {
  [key: string]: React.ComponentClass;
}
