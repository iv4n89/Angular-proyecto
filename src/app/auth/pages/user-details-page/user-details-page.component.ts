import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User, UserForm } from '../../interfaces/user.interfaces';
import { successToast } from '../../../shared/helpers/SwalToast.helper';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styles: [`
    .details-container {
      position: relative;
    }
    .logout {
      position: absolute;
      right: -55px;
      top: -45px;
    }
  `]
})
export class UserDetailsPageComponent implements OnInit {

  get user() {
    return this.authService.user;
  }

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
  }

  editUser(user: UserForm) {
    let { name, email, password, password2, role, img } = user;
    let id = this.authService.user.id;
    this.userService.checkPassword(email, password)
      .pipe(
        switchMap(resp => {
          console.log(resp)
          if (resp === true) {
            if (password2) password = password2;
            return this.userService.updateOneUser(Number(id), { name, email, password, role, img })
              .pipe(
                map(resp => {
                  this.authService.validarToken().subscribe();
                  return resp;
                })
              )
          } else {
            return of(false);
          }
        })
    ).subscribe(resp => {
      console.log(resp)
      if (resp === true) {
        successToast('Usuario actualizado');
        this.router.navigate([this.router.url]);
      } else {
        Swal.fire('Error', 'Contraseña incorrecta', 'error');
        }
      });
  }

  deleteUser(confirm: boolean) {
    if (confirm) {

      this.userService.deleteOneUser(Number(this.user.id))
        .subscribe(response => {
          if (response === true) {
            Swal.fire('Usuario eliminado', 'El usuario ha sido borrado', 'success')
              .then(result => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                  this.authService.logout();
                  this.router.navigate(['/films/list']);
                }
              });
          } else {
            Swal.fire('Error', response, 'error');
          }
        })
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/film/list');
  }
}
