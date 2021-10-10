import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[password1];
      const pass2Control = formGroup.controls[password2];
      if (pass2Control.errors && !pass2Control.errors.passwordMissmatch) {
        return;
      }
      if (pass1Control.value !== pass2Control.value) {
        pass2Control.setErrors({ passwordMissmatch: true });
      } else {
        pass2Control.setErrors(null);
      }
    }
}

export function passwordMustntMatch(password1: string, password2: string) {
  return (formGroup: FormGroup) => {
    const pass1Control = formGroup.controls[password1];
    const pass2Control = formGroup.controls[password2];
    if (pass2Control.errors && !pass2Control.errors.passwordAreEqual) {
      return;
    }
    if (pass1Control.value === "" && pass2Control.value === "") {
      return;
    }
    if (pass1Control.value !== "" && pass2Control.value === "") {
      pass2Control.setErrors({ newPasswordRequired: true });
    }
    if (pass1Control.value === "" && pass2Control.value !== "") {
      pass1Control.setErrors({ oldPasswordRequired: true });
    }
    if (pass1Control.value === pass2Control.value) {
      pass2Control.setErrors({ passwordAreEqual: true });
    } else {
      pass2Control.setErrors(null);
    }
  }
}


