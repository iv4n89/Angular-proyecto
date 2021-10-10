import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';

import { IUserService, User, UserResponse } from '../interfaces/user.interfaces';
import { environment } from '../../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  private static service: UserService | undefined = undefined;
  private url: string = environment.baseUrl;

  public static getService(): UserService {
    if (!UserService.service) {
      throw new Error();
    }
    return UserService.service;
  }

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }
  getOneUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${userId}`);
  }
  getUserName(userId: number): Observable<string> {
    return this.http.get<User>(`${this.url}/users/${userId}`)
      .pipe(
        map(res => res.name!)
      )
  }
  insertOneUser(user: User) {
    return this.http.post<UserResponse>(`${this.url}/users`, user)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }
  updateOneUser(userId: number, user: User) {
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token')!);
    return this.http.put<UserResponse>(`${this.url}/users/${userId}`, user ,{ headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }
  deleteOneUser(userId: number) {
    return this.http.delete<UserResponse>(`${this.url}/users/${userId}`)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
        );
  }

  checkPassword(email: string, password: string) {
    return this.http.post<UserResponse>(`${this.url}/users/checkPassword`, { email, password })
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }
}