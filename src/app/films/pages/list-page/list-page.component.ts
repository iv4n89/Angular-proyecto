import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Film, Filter_query } from '../../interfaces/films.interfaces';
import { BuscadorService } from '../../services/buscador.service';
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
  orden: string = 'DESC';
  filtro: string = "";
  options: Filter_query = {
    limit: 8,
    offset: 0,
    contains: '',
    genero: '',
    year: 0,
    duracion: 0,
    puntuacion: 0,
    order: 'createdAt-DESC'
  }
  @Input() termino: string | number = '';
  films: Film[] = [];

  genero_busqueda: FormGroup = this.fb.group({
    genero: [this.options.genero],
    year: [this.options.year],
    puntuacion: [this.options.puntuacion],
    duracion: [this.options.duracion]
  });

  get hasNextPage() {
    return (this.total - this.options.offset!) > this.options.limit!;
  }

  get hasPrevPage() {
    return this.options.offset! !== 0;
  }

  constructor(private filmService: FilmsService, private buscadorService: BuscadorService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.repoblar();
    this.buscadorService.terminoSubscriber.subscribe(
      termino => {
        if (!Number.isNaN(Number(termino))) {
          this.options.year = Number(termino);
          this.repoblar();
        } else {
          this.options.contains = termino;
          this.repoblar();
        }
      }
    );
    this.genero_busqueda.valueChanges.subscribe(changes => {
      this.options.duracion = changes.duracion;
      this.options.genero = changes.genero;
      this.options.puntuacion = changes.puntuacion;
      this.options.year = changes.year;
      if (changes.duracion === null) this.options.duracion = 0;
      if (changes.genero === '---Seleccione---') this.options.genero = "";
      if (changes.puntuacion === null) this.options.puntuacion = 0;
      if (changes.year === null) this.options.year = 0;
      this.repoblar();
    })
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
      this.options.offset! = 0;
      return;
    }
    this.options.offset! -= this.options.limit!;
    this.repoblar();
  }

  selectGenero(genero: string) {
    this.genero_busqueda.get('genero')?.setValue(genero);
  }

  ordenar(por: string) {
    if (this.filtro !== por && por !== 'titulo') {
      this.filtro = por;
      this.orden = 'DESC';
    } else if (por === 'titulo' && this.filtro !== por) {
      this.filtro = por;
      this.orden = 'ASC';
    } else {
      if (this.orden === 'DESC') this.orden = 'ASC'
      else this.orden = 'DESC';
    }
    this.options.order = `${por}-${this.orden}`;
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
