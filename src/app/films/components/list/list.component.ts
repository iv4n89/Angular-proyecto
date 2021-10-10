import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../interfaces/films.interfaces';
import { BuscadorService } from '../../services/buscador.service';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [`

    @media screen and (max-width: 400px) {
      .btn-pagination {
        width: 60px !important;
        height: 40px !important;
        font-size: 10px;
      }
    }
  `
  ]
})
export class ListComponent implements OnInit {

  total: number = 0;
  limit: number = 8;
  offset: number = 0;
  @Input() termino: string | number = '';
  films: Film[] = [];

  get hasNextPage() {
    return (this.total - this.offset) > this.limit;
  }

  get hasPrevPage() {
    return this.offset !== 0;
  }

  constructor(private filmService: FilmsService, private buscadorService: BuscadorService) { }

  ngOnInit(): void {
    this.repoblar();
    this.buscadorService.terminoSubscriber.subscribe(
      termino => {
        if (!Number.isNaN(Number(termino))) {
          this.repoblar("", Number(termino));
        } else {
          this.repoblar(termino)
        }

      }
    )
  }

  nextPage() {
    if (this.total < this.offset + this.limit) {
      return;
    }
    this.offset += this.limit;
    this.repoblar();
  }

  prevPage() {
    if (this.offset <= 0) {
      this.offset = 0;
      return;
    }
    this.offset -= this.limit;
    this.repoblar();
  }

  private repoblar(contains: string = "", year: number = 0) {
    this.filmService.getAllFilms(this.limit, this.offset, contains, year)
      .subscribe(
        films => {
          console.log(films, contains, year)
          this.films = films.films;
          this.total = films.total;
        },
        error => console.log(error)
    );
  }

  filmDeleted() {
    this.repoblar();
  }

}
