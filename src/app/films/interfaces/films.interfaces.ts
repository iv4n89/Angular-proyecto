import { Observable } from "rxjs";

export interface Film {
  id: number,
  titulo: string,
  estreno: number,
  UserId: number,
  img?: string
  puntuacion_media?: number,
}

export interface FilmResponse {
  total: number,
  films: Film[]
}

export interface IFilmService {
  getAllFilms(limit: number, offset: number): Observable<FilmResponse>,
  getOneFilm(id: number): Observable<Film>,
  insertOneFilm(film: Film): Observable<Film>,
  updateOneFilm(id: number, film: Film): Observable<Film>,
  deleteOneFilm(id: number): Observable<void>
}
