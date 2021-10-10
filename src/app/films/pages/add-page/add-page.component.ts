import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Film } from '../../interfaces/films.interfaces';

import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styles: [`
    img {
      max-width: 100%;
      max-height: 400px;
    }
    .imagen-pelicula {
      background-color: white;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 5px;
      display: flex;
      justify-content: center;
      height: 450px;
      margin-top: 10px;
      position: relative;
      padding: 10px;
      width: 350px;
    }
    .imagen-pelicula:after {
      content: "Imagen de la pelicula";
      position: absolute;
      top: 5px;
      left: 27%;
    }
    .imagen-pelicula img {
      position: absolute;
      top: 35px;
    }
    .button-container {
      display: block;
    }
    @media screen and (max-width: 560px) {
      .imagen-container {
        display: flex;
        justify-content: center;
      }
      .imagen-pelicula {
        height: 300px;
        width: 200px;
      }
      .imagen-pelicula:after {
        left: 10%;
      }
      .button-container {
        display: flex !important;
        justify-content: center !important;
      }
    }
  `]
})
export class AddPageComponent implements OnInit {

  private _imagen_mostrar: string = "";
  set imagen_mostrar(value: string) {
    this._imagen_mostrar = value;
  }
  get imagen_mostrar() {
    return this._imagen_mostrar;
  }

  private _newFilmForm!: FormGroup;
  set newFilmForm(value: FormGroup) {
    this._newFilmForm = value;
  }
  get newFilmForm() {
    return this._newFilmForm;
  }

  imagen_subir: boolean = false;

  constructor(private filmService: FilmsService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  addFilm() {
    if (this.newFilmForm) {
        if (this.newFilmForm.invalid) {
          return;
        }
      const UserId = this.authService.user.id;
      const newFilm: Film = { UserId, ...this.newFilmForm.value };
      this.filmService.insertOneFilm(newFilm)
        .subscribe();
      this.router.navigateByUrl('/films/list');
    }

  }

}
