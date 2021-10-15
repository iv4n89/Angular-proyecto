import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { BuscadorService } from 'src/app/films/services/buscador.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-collapsed-navbar',
  templateUrl: './collapsed-navbar.component.html',
  styles: [
  ]
})
export class CollapsedNavbarComponent implements OnInit {

  buscador: FormGroup = this.fb.group({
    termino: ['']
  });

  constructor(private authService: AuthService, private buscadorService: BuscadorService, private router: Router, private fb: FormBuilder) { }

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

  get userName() {
    return this.authService.user.name;
  }

  checkAdmin(): boolean {
    if (this.authService.loged && this.authService.user.role === 'ADMIN_ROLE') {
      return true;
    }
    return false;
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

}
