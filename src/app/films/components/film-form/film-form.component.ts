import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styles: [`
    .button-container {
        display: flex !important;
        justify-content: center !important;
      }
  `]
})
export class FilmFormComponent implements OnInit {

  newFilmForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    estreno: [1950, [Validators.required, Validators.min(1950), Validators.max(2022)]],
    img: ['']
  });

  @Output() imagen_mostrar: EventEmitter<string> = new EventEmitter();
  @Output() filmFormValue: EventEmitter<FormGroup> = new EventEmitter();
  imagen_subir: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newFilmForm.get('img')?.valueChanges.subscribe(
      img => this.imagen_mostrar.emit(img)
    );
    this.newFilmForm.valueChanges.subscribe(
      value => {
        if (this.newFilmForm.valid) {
          this.filmFormValue.emit(this.newFilmForm);
        }
      }
    )
  }

  tieneError(campo: string): boolean {
    if (this.newFilmForm.get(campo)?.dirty || this.newFilmForm.get(campo)?.touched) {
      return this.newFilmForm.controls[campo].invalid;
    }
    return false;
  }

}
