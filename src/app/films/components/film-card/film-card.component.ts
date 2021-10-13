import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Film } from '../../interfaces/films.interfaces';
import { FilmsService } from '../../services/films.service';
import { successToast, failToast } from '../../../shared/helpers/SwalToast.helper';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.style.css']
})
export class FilmCardComponent implements OnInit {

  @Input() film!: Film;
  @Output() filmDeleted: EventEmitter<void> = new EventEmitter();

  constructor(private filmService: FilmsService, private authService: AuthService, private router: Router) {
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
  }

  get filmImage() {
    // if (this.film.img && !this.film.img.includes('/')) {
    //   return `${environment.filmsImageUrl}/${this.film.id}`;
    // } else {
    //   return this.film.img;
    // }
    return this.filmService.getFilmImage(this.film);
  }

  borrarPelicula(id: number) {
    Swal.fire({
      title: 'Borrar entrada',
      text: '¿Desea borrar esta película de la base de datos?',
      icon: 'question',
      iconColor: 'red',
      confirmButtonColor: 'red',
      confirmButtonText: 'Borrar',
      showCancelButton: true,
      cancelButtonColor: 'green',
      cancelButtonText: 'Cancelar'
    }).then(
      result => {
        if (result.isConfirmed) {
          this.filmService.deleteOneFilm(id)
            .subscribe(result => this.filmDeleted.emit(result));
          successToast('Entrada borrada de la base de datos');
        } else if (result.isDismissed || result.dismiss == Swal.DismissReason.backdrop) {
          failToast('Acción cancelada');
        }
      }
    )
  }

  editarPelicula(id: number) {
    Swal.fire({
      title: 'Editar Entrada',
      html: `
        <form id="form" style="overflow-x: hidden">
          <div class="row align-items-center justify-content-center mb-2">
            <label class="col-md-3 col-sm-6">Título</label>
            <input class="swal2-input col-6" type="text" id="titulo" value="${this.film.titulo}" required >
          </div>
          <div class="row align-items-center justify-content-center mb-2">
            <label class="col-md-3 col-sm-6">Estreno</label>
            <input class="swal2-input col-6" type="text" id="estreno" value="${this.film.estreno}" required >
          </div>
          <div class="row align-items-center justify-content-center mb-2">
            <label class="col-md-3 col-sm-6">Género</label>
            <select class="swal2-input col-6" id="genero">
              <option selected disabled hidden>---Seleccione---</option>
              <option value="acción">Acción</option>
              <option value="animación">Animación</option>
              <option value="aventura">Aventura</option>
              <option value="biografía">Biografía</option>
              <option value="ciencia_ficción">Ciencia Ficción</option>
              <option value="comedia">Comedia</option>
              <option value="crimen">Crimen</option>
              <option value="deporte">Deporte</option>
              <option value="documental">Documental</option>
              <option value="drama">Drama</option>
              <option value="erótica">Erótica</option>
              <option value="familiar">Familiar</option>
              <option value="fantasía">Fantasia</option>
              <option value="guerra">Guerra</option>
              <option value="historia">Historia</option>
              <option value="misterio">Misterio</option>
              <option value="musical">Musical</option>
              <option value="romance">Romance</option>
              <option value="suspense">Suspense</option>
              <option value="thriller">Thriller</option>
              <option value="terror">Terror</option>
              <option value="western">Western</option>
            </select>
          </div>
          <div class="row align-items-center justify-content-center">
            <label class="col-md-3 col-sm-6">Imagen</label>
            <input class="swal2-input col-6" type="text" id="imagen" value="${this.film.img}" required >
          </div>
        </form>
      `,
      heightAuto: true,
      confirmButtonColor: 'green',
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      cancelButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        //Recoger el formulario e inputs en variables
        const form = document.getElementById('form') as HTMLFormElement;
        const titulo = document.getElementById('titulo') as HTMLInputElement;
        const estreno = document.getElementById('estreno') as HTMLInputElement;
        const genero = document.getElementById('genero') as HTMLSelectElement;
        const imagen = document.getElementById('imagen') as HTMLInputElement;

        //Revisar si los datos del formulario son correctos
        if (!form.checkValidity()) {
          failToast('Datos de película no validos');
          return;
        }

        //Devuelve los datos del formulario al próximo paso
        return {
          titulo: titulo.value,
          estreno: estreno.value,
          genero: genero.value,
          img: imagen.value
        }
      }
    }).then(
      result => {
        if (result.isConfirmed) {
          //Si se pulsa aceptar, crear un objeto de tipo Film y actualizar la base de datos
          const newFilmValues: Film = {
            id,
            titulo: result.value?.titulo!,
            estreno: Number(result.value?.estreno!),
            img: result.value?.img,
            UserId: this.film.UserId,
            genero: result.value?.genero!
          }
          this.filmService.updateOneFilm(id, newFilmValues)
            .subscribe(result => {
              //Si se actualiza la base de datos, se avisa al usuario a través de un modal
              successToast('Entrada actualizada con éxito');
              //Recarga del componente
              this.router.navigateByUrl('/films/list');
            });
        } else if (result.isDismissed || result.dismiss == Swal.DismissReason.backdrop) {
          //Si se pulsa fuera del modal o se pulsa cancela, se notifica de acción cancelada al usuario a través de un modal
          failToast('Acción cancelada');
          }
      }
    );
  }

  checkAdmin(): boolean {
    if (this.authService.loged && this.authService.user.role === 'ADMIN_ROLE') {
      return true
    }
    return false;
  }

}
