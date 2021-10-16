import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { infoToast, successToast } from '../../../shared/helpers/SwalToast.helper';
import { User, UserForm } from '../../interfaces/user.interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: [`../styles/auth.styles.css`]
})
export class UserDetailsPageComponent implements OnInit {

  edit_user: boolean = false;

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
    let newUser: User;
    if (img === "") {
      newUser = { name, email, password, role };
    } else {
      newUser = { name, email, password, role, img };
    }
    let id = this.authService.user.id;
    if (this.edit_user === true) {
      this.userService.checkPassword(email, password)
        .pipe(
          switchMap(resp => {
            console.log(resp)
            if (resp === true) {
              if (password2) password = password2;
              return this.userService.updateOneUser(Number(id), newUser)
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
    infoToast('Usuario desconectado');
    this.router.navigateByUrl('/film/list');
  }

  editando(value: boolean) {
    this.edit_user = value;
  }
}
