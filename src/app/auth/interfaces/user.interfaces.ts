import { Observable } from 'rxjs';

export interface User {
  id?: number,
  name?: string,
  email: string,
  password?: string,
  img?: string,
  role: string
}

export interface UserForm {
  id?: number,
  name: string,
  email: string,
  password: string,
  password2?: string,
  img?: string,
  role: string
}

export interface UserResponse {
  ok: boolean,
  user?: User,
  token?: string
}

export interface UserName {
  id: number,
  name: string
}

export interface IUserService {
  getAllUsers(): Observable<User[]>,
  getOneUser(userId: number): Observable<User>,
  insertOneUser(user: User): any,
  updateOneUser(userId: number, user: User): any,
  deleteOneUser(userId: number): any
}
