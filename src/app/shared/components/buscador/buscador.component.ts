import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { BuscadorService } from 'src/app/films/services/buscador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['../../styles/sidenav.styles.css']
})
export class BuscadorComponent implements OnInit {

  buscador: FormGroup = this.fb.group({
    termino: ['']
  });
  open: boolean = false;

  constructor( private fb: FormBuilder, private buscadorService: BuscadorService, private router: Router ) { }

  ngOnInit(): void {
    this.buscadorService.termino = '';
    this.buscador.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(
      value => this.buscadorService.termino = value.termino
    );
  }

  buscar() {
    this.buscadorService.termino = this.buscador.get('termino')?.value;
    this.router.navigateByUrl('/films/list');
  }

}
