import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BuscadorService } from 'src/app/films/services/buscador.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { successToast } from '../../helpers/SwalToast.helper';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['../../styles/sidenav.styles.css']
})
export class SideNavComponent implements OnInit {

  buscador: FormGroup = this.fb.group({
    termino: ['']
  });
  open: boolean = false;

  get userName() {
    return this.authService.user.name;
  }
  get userRole() {
    return this.authService.user.role.split('_')[0];
  }
  get avatar() {
    return this.userService.getUserImage(this.authService.user);
  }

  constructor(private fb: FormBuilder, private buscadorService: BuscadorService, private router: Router, private authService: AuthService, private userService: UserService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.buscadorService.termino = '';
    this.buscador.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(
      value => this.buscadorService.termino = value.termino
    );
  }

  openClose() {
    this.open = !this.open;
  }

  openTab() {
    this.open = true;
  }

  buscar() {
    this.buscadorService.termino = this.buscador.get('termino')?.value;
    this.router.navigateByUrl('/films/list');
  }

  checkLogin(): boolean {
    if (this.authService.loged) {
      return true;
    }
    return false;
  }

  checkAdmin(): boolean {
    if (this.authService.loged && this.authService.user.role === 'ADMIN_ROLE') {
      return true;
    }
    return false;
  }

  logOut() {
    if (this.authService.loged) {
      this.authService.logout();
      this.router.navigateByUrl('/films/list');
    }
  }

  login() {
    this.router.navigateByUrl('/auth/login');
  }

}
