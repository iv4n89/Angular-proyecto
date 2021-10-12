import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Film, Filter_query } from '../../interfaces/films.interfaces';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-top-list-page',
  templateUrl: './top-list-page.component.html',
  styles: [
  ]
})
export class TopListPageComponent implements OnInit {

  limit: number = 100;
  offset: number = 0;

  films: Film[] = [];

  constructor(private filmService: FilmsService) { }

  ngOnInit(): void {
    this.repoblar({limit: this.limit, offset: this.offset});
  }

  repoblar(options?: Filter_query) {
    this.filmService.getAllFilms(options || {})
      .pipe(
        map(films => films.films.sort((current, next) => next.puntuacion_media! - current.puntuacion_media!)),
      ).subscribe(films => this.films = films);
  }

}
