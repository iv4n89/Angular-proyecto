import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthForm } from '../../interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';
import { successToast } from '../../../shared/helpers/SwalToast.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles/auth.styles.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  loginUser(login: AuthForm) {
    this.authService.login(login.email, login.password)
      .subscribe(resp => {
        if (resp.ok) {
          this.router.navigateByUrl('/films/list');
          successToast('Usuario conectado');
        } else {
          Swal.fire('Error', resp, 'error');
        }
      });
  }

  renewToken() {
    this.authService.validarToken()
      .subscribe(
        resp => {
          if (resp) {
            this.router.navigateByUrl('/films/list');

          }
        }
      );
  }

}
