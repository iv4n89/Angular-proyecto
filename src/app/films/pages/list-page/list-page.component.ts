import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { BuscadorService } from '../../services/buscador.service';
import { Film, Filter_query } from '../../interfaces/films.interfaces';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [`
    @media screen and (max-width: 570px) {
        .btn-pagination {
          width: 60px !important;
          height: 40px !important;
          font-size: 10px;
        }
      }
    button {
      font-size: small;
    }
    button:hover {
      background: rgba(0,0,0,0.1);
      transition: all ease 0.5s;
    }
    .btn:focus {
      box-shadow: none !important;
    }
  `]
})
export class ListPageComponent implements OnInit {

  total: number = 0;
  options!: Filter_query;
  @Input() termino: string | number = '';
  films: Film[] = [];

  get hasNextPage() {
    return (this.total - this.options.offset!) > this.options.limit!;
  }

  get hasPrevPage() {
    return this.options.offset! !== 0;
  }

  constructor(private filmService: FilmsService, private buscadorService: BuscadorService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.options) {
      this.repoblar();
    }
  }

  nextPage() {
    if (this.total < this.options.offset! + this.options.limit!) {
      return;
    }
    this.options.offset! += this.options.limit!;
    this.repoblar();
  }

  prevPage() {
    if (this.options.offset! <= 0) {
      this.options.offset = 0;
      return;
    }
    this.options.offset! -= this.options.limit!;
    this.repoblar();
  }

  optionsChanged(options: Filter_query) {
    this.options = options;
    this.repoblar();
  }


  private repoblar() {
    this.filmService.getAllFilms(this.options)
      .subscribe(
        films => {
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
