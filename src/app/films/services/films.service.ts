import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Film, FilmResponse, Filter_query, IFilmService } from '../interfaces/films.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmsService implements IFilmService {

  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private get headers() {
    return new HttpHeaders().set('x-token', localStorage.getItem('token') || "");
  }

  getAllFilms(options: Filter_query): Observable<FilmResponse> {
    const { limit = 8, offset = 0, contains = "", duracion = 0, genero = "", puntuacion = 0, year = 0, order = 'createdAt-DESC' } = options;
    return this.http.get<FilmResponse>(`${this.url}/films?limit=${limit}&offset=${offset}&contains=${contains}&duracion=${duracion}&genero=${genero}&puntuacion=${puntuacion}&year=${year}&order=${order}`);
  }
  getOneFilm(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.url}/films/${id}`);
  }
  insertOneFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(`${this.url}/films`, film, { headers: this.headers });
  }
  updateOneFilm(id: number, film: Film): Observable<Film> {
    return this.http.put<Film>(`${this.url}/films/${id}`, film, { headers: this.headers });
  }
  deleteOneFilm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/films/${id}`, { headers: this.headers });
  }
}

