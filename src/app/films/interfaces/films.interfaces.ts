import { Observable } from "rxjs";

export interface Film {
  id: number,
  titulo: string,
  estreno: number,
  duracion?: number,
  genero: string,
  UserId: number,
  img?: string
  puntuacion_media?: number,
}

export interface FilmResponse {
  total: number,
  films: Film[]
}

export interface Filter_query {
  limit?: number,
  offset?: number,
  contains?: string,
  duracion?: number,
  genero?: string,
  puntuacion?: number,
  year?: number,
  order?: string
}

export interface IFilmService {
  getAllFilms(options: Filter_query): Observable<FilmResponse>,
  getOneFilm(id: number): Observable<Film>,
  insertOneFilm(film: Film): Observable<Film>,
  updateOneFilm(id: number, film: Film): Observable<Film>,
  deleteOneFilm(id: number): Observable<void>
}


