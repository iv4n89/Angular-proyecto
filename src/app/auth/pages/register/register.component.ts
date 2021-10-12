import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { UserForm } from '../../interfaces/user.interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../styles/auth.styles.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router:Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  registerNewUser(userForm: UserForm) {
    if (userForm) {
        const { name, email, password, role, img } = userForm;
        this.userService.insertOneUser({ name, email, password, role, img })
        .subscribe(
          response => {
            if (response === true) {
              Swal.fire('OK', 'Usuario creado', 'success')
                .then(result => {
                  if (!localStorage.getItem('token')) {
                    this.authService.login(email, password).subscribe();
                    this.router.navigate(['/films/list']);
                  }
                });
            } else {
              Swal.fire('Error', response, 'error');
            }
          });
        }
    }

}
