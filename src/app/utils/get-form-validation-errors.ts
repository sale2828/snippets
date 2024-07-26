import { FormGroup, ValidationErrors } from "@angular/forms";

export function getFormValidationErrors(form: FormGroup): Array<string> {
  const errors: Array<string> = [];

  if (form === null) {
    return errors;
  }

  Object.keys(form.controls).forEach(key => {
    const controlErrors: ValidationErrors | null | undefined = form.get(key)?.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(keyError => {
        errors.push(keyError);
      });
    }
  });
  return errors;
}
