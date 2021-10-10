import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserForm } from '../../interfaces/user.interfaces';
import { passwordMatchValidator } from '../../../shared/validators/custom-validators/custom-validators.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../../pages/styles/auth.styles.css']
})
export class RegisterFormComponent implements OnInit {

  avatars: string[] = [ ...environment.avatars ];

  newUserForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    role: ['USER_ROLE', [Validators.required]],
    img: [this.avatars[this.avatars.length-1]]
  }, {
    validator: passwordMatchValidator('password', 'password2')
  });

  @Output() registerEmitter: EventEmitter<UserForm> = new EventEmitter();

  getAvatar(number: number) {
    return this.avatars[number];
  }

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  tieneError(campo: string, errorName: string): boolean {
    if (this.newUserForm.get(campo)?.dirty || this.newUserForm.get(campo)?.touched) {
      if (errorName === 'minLength') {
        return this.newUserForm.controls[campo].errors?.[errorName].minlength.actualLength >= this.newUserForm.controls[campo].errors?.[errorName].minlength.requiredLength;
      }
      return this.newUserForm.controls[campo].errors?.[errorName];
    }
    return false;
  }

  customSubmit() {
    const controls = Object.keys(this.newUserForm.controls);
    controls.forEach(control => {
      this.newUserForm.controls[control].markAsTouched();
    });
    if (this.newUserForm.valid) {
      this.registerEmitter.emit(this.newUserForm.value);
      this.newUserForm.reset();
    }
  }

}
