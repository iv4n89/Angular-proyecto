import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import Swal from 'sweetalert2';

import { successToast, failToast } from '../../../shared/helpers/SwalToast.helper';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Film } from '../../interfaces/films.interfaces';
import { FilmsService } from '../../services/films.service';
import { Router } from '@angular/router';


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

  borrarPelicula(id: number) {
    Swal.fire({
      title: 'Borrar entrada',
      text: '¿Desea borrar esta película de la base de datos?',
      icon: 'question',
      iconColor: 'red',
      confirmButtonColor: 'green',
      confirmButtonText: 'Borrar',
      showCancelButton: true,
      cancelButtonColor: 'red',
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
        <form id="form">
          <div>
            <label>Título</label>
            <input class="swal2-input" type="text" id="titulo" value="${this.film.titulo}" required>
          </div>
          <div>
            <label>Estreno</label>
            <input class="swal2-input" type="text" id="estreno" value="${this.film.estreno}" required>
          </div>
          <div>
            <label>Imagen</label>
            <input class="swal2-input" type="text" id="imagen" value="${this.film.img}" required>
          </div>
        </form>
      `,
      confirmButtonColor: 'green',
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      cancelButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const form = document.getElementById('form') as HTMLFormElement;
        const titulo = document.getElementById('titulo') as HTMLInputElement;
        const estreno = document.getElementById('estreno') as HTMLInputElement;
        const imagen = document.getElementById('imagen') as HTMLInputElement;

        if (!form.checkValidity()) {
          failToast('Datos de película no validos');
          return;
        }

        return {
          titulo: titulo.value,
          estreno: estreno.value,
          img: imagen.value
        }
      }
    }).then(
      result => {
        if (result.isConfirmed) {
          const newFilmValues: Film = {
            id,
            titulo: result.value?.titulo!,
            estreno: Number(result.value?.estreno!),
            UserId: this.film.UserId
          }
          this.filmService.updateOneFilm(id, newFilmValues)
            .subscribe(result => {
              successToast('Entrada actualizada con éxito');
              this.router.navigateByUrl('/films/list');
            });
        } else if (result.isDismissed || result.dismiss == Swal.DismissReason.backdrop) {
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
