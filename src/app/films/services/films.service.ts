import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Film, FilmResponse, Filter_query, IFilmService } from '../interfaces/films.interfaces';

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
    const params = new HttpParams().appendAll({ ...options });
    return this.http.get<FilmResponse>(`${this.url}/films`, { params });
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
  uploadFilmImage(id: number, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('archivo', file, file.name);
    return this.http.put<void>(`${environment.filmsImageUrl}/${id}`, formData, { headers: this.headers });
  }
  getFilmImage(film: Film) {
    if (film.img && !film.img.includes('/')) {
      return `${environment.filmsImageUrl}/${film.id}`;
    } else {
      return film.img;
    }
  }
}

