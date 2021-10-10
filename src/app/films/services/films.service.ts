import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Film, FilmResponse, IFilmService } from '../interfaces/films.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmsService implements IFilmService {

  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllFilms(limit: number, offset: number, contains?: string, year: number = 0): Observable<FilmResponse> {
    return this.http.get<FilmResponse>(`${this.url}/films?limit=${limit}&offset=${offset}&contains=${contains}&year=${year}`);
  }
  getOneFilm(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.url}/films/${id}`);
  }
  insertOneFilm(film: Film): Observable<Film> {
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || "");
    return this.http.post<Film>(`${this.url}/films`, film, { headers });
  }
  updateOneFilm(id: number, film: Film): Observable<Film> {
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || "");
    return this.http.put<Film>(`${this.url}/films/${id}`, film, { headers });
  }
  deleteOneFilm(id: number): Observable<void> {
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || "");
    return this.http.delete<void>(`${this.url}/films/${id}`, { headers });
  }
}
