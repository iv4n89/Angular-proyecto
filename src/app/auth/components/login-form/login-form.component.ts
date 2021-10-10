import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User, UserForm } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../../pages/styles/auth.styles.css']
})
export class LoginFormComponent implements OnInit {

  loginFormGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  @Output() loginEmitter: EventEmitter<UserForm> = new EventEmitter();

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {

  }

  tieneError(campo: string, errorName: string) {
    if (this.loginFormGroup.get(campo)?.dirty || this.loginFormGroup.get(campo)?.touched) {
      if (errorName === 'minlength') {
        return this.loginFormGroup.controls[campo].errors?.[errorName]?.actualLength <= this.loginFormGroup.controls[campo].errors?.[errorName]?.requiredLength;
      }
      return this.loginFormGroup.controls[campo].errors?.[errorName];
    }
    return false;
  }

  customSubmit() {
    const controls = Object.keys(this.loginFormGroup.controls);
    controls.forEach(control => {
      this.loginFormGroup.controls[control].markAsTouched();
    });
    if (this.loginFormGroup.valid) {
      this.loginEmitter.emit(this.loginFormGroup.value);
    }
  }

}
