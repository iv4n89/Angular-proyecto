import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/films/interfaces/films.interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['../../styles/comments.styles.css']
})
export class FilmInfoComponent implements OnInit {

  @Input() film!: Film;
  @Input() innerWidth!: number;

  get filmImage() {
    if (this.film.img && !this.film.img.includes('/')) {
      return `${environment.filmsImageUrl}/${this.film.id}`;
    } else {
      return this.film.img;
    }
  }

  get screen() {
    if (this.innerWidth >= 650) {
      return 5;
    } else {
      return 2;
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
