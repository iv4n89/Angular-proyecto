
export interface AuthUserValues {
  id: string,
  name: string,
  email: string,
  password?: string,
  img?: string,
  role: string,
  state?: boolean,
  createdAt?: string,
  updatedAt?: string
}

export interface AuthForm {
  email: string,
  password: string
}

export interface AuthResponse {
  ok?: boolean,
  userValues: AuthUserValues,
  token: string
}
