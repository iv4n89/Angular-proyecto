import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Film } from '../../interfaces/films.interfaces';
import { FilmsService } from '../../services/films.service';

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
    estreno: [1950, [Validators.required, Validators.min(1950), Validators.max(this.currentYear)]],
    duracion: [0, [Validators.required, Validators.min(0)]],
    genero: ['---Seleccione---', [Validators.required]],
    img: new FormControl('', Validators.required)
  });

  @Output() imagen_mostrar: EventEmitter<string> = new EventEmitter();
  @Output() filmFormValue: EventEmitter<FormGroup> = new EventEmitter();
  imagen_subir: boolean = false;
  file: File | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private filmService: FilmsService) { }

  get currentYear() {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    this.newFilmForm.get('img')?.valueChanges.subscribe( img => {
        this.imagen_mostrar.emit(img)
      }
    );
  }

  addFilm() {
    if (this.newFilmForm) {
      if (this.newFilmForm.invalid) {
        return;
      }
      const UserId = this.authService.user.id;
      const newFilm: Film = { UserId, ...this.newFilmForm.value };
      this.filmService.insertOneFilm(newFilm)
        .subscribe(result => {
          if (this.imagen_subir) {
            this.filmService.uploadFilmImage(result.id, this.file!).subscribe();
          }
        });
      this.router.navigateByUrl('/films/list');
    }
  }

  selectGenero(genero: string) {
    this.newFilmForm.get('genero')?.setValue(genero);
  }

  tieneError(campo: string): boolean {
    if (this.newFilmForm.get(campo)?.dirty || this.newFilmForm.get(campo)?.touched) {
      return this.newFilmForm.controls[campo].invalid;
    }
    return false;
  }

  subirImagen() {
    this.imagen_subir = !this.imagen_subir;
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.file = event.target.files[0];
      this.imagen_mostrar.emit(reader.result as string);
    }
  }

}
