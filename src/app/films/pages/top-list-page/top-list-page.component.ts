import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Film } from '../../interfaces/films.interfaces';
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
    this.repoblar();
  }

  repoblar() {
    this.filmService.getAllFilms(this.limit, this.offset)
      .pipe(
        map(films => films.films.sort((current, next) => next.puntuacion_media! - current.puntuacion_media!)),
      ).subscribe(films => this.films = films);
  }

}
