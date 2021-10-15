import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BuscadorService } from '../../services/buscador.service';
import { Filter_query } from '../../interfaces/films.interfaces';

@Component({
  selector: 'app-filtrado',
  templateUrl: './filtrado.component.html',
  styles: [`
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
export class FiltradoComponent implements OnInit {

  orden: string = 'DESC';
  filtro: string = "";

  @Output('options') options_onChange: EventEmitter<Filter_query> = new EventEmitter();

  constructor(private fb: FormBuilder, private buscadorService: BuscadorService) {

  }

  filtrado: FormGroup = this.fb.group({
    limit: 8,
    offset: 0,
    contains: '',
    genero: [''],
    year: [0],
    duracion: [0],
    puntuacion: [0],
    order: ['createdAt-DESC']
  })


  ngOnInit(): void {
    this.options_onChange.emit(this.filtrado.value);
    this.buscadorService.terminoSubscriber.subscribe(
        termino => {
          if (!Number.isNaN(Number(termino))) {
            this.filtrado.controls['year'].setValue(Number(termino));
          } else {
            this.filtrado.controls['contains'].setValue(termino);
          }
        if (termino === "") {
          this.filtrado.controls['contains'].setValue("");
          }
        }
      );
    this.filtrado.valueChanges.subscribe(changes => {
      if (!changes.year) changes.year = 0;
      if (!changes.puntuacion) changes.puntuacion = 0;
      if (!changes.duracion) changes.duracion = 0;
      this.options_onChange.emit(changes)
    });
  }

  selectGenero(genero: string) {
    this.filtrado.get('genero')?.setValue(genero);
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
    this.filtrado.get('order')?.setValue(`${por}-${this.orden}`);
  }

}
