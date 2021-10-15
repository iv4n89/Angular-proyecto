import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthResponse } from '../interfaces/auth.interfaces';
import { infoToast } from '../../shared/helpers/SwalToast.helper';
import { User } from '../interfaces/user.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private nullUser: User = {
    email: "null",
    role: 'USER_ROLE'
  }

  private baseUrl = environment.baseUrl;
  private _user!: User;
  loged!: boolean;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url: string = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.userValues.id) {
            localStorage.setItem('token', resp.token);
            this._user = {
              name: resp.userValues.name,
              email: resp.userValues.email,
              id: Number(resp.userValues.id),
              role: resp.userValues.role,
              img: resp.userValues.img
            }
            this.loged = true;
          }
        }),
        map(resp => {
          return {
            ok: resp.ok,
            userValues: resp.userValues
          }
        }),
        catchError(err => {
          this.loged = false;
          this._user = this.nullUser;
          return of(err.error.msg)
        })
      );
  }

  validarToken() {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token);
          this._user = {
            name: resp.userValues.name,
            email: resp.userValues.email,
            id: Number(resp.userValues.id),
            role: resp.userValues.role,
            img: resp.userValues.img
          }
          this.loged = true;
          return true;
        }),
        catchError(err => {
          this.loged = false;
          this._user = this.nullUser;
          return of(false);
        })
      );
  }

  logout() {
    localStorage.clear();
    this._user = this.nullUser;
    this.loged = false;
    infoToast('Usuario desconectado'); // sacar
  }

}
