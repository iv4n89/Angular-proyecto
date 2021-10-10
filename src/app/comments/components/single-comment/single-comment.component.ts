import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { failToast } from 'src/app/shared/helpers/SwalToast.helper';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Comment } from '../../interfaces/comments.interfaces';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['../../styles/comments.styles.css']
})
export class SingleCommentComponent implements OnInit {

  @Input() comment!: Comment;
  @Input() editar: boolean = false;
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter();
  @Output() onDelete: EventEmitter<number> = new EventEmitter();

  defaultAvatar = [...environment.avatars][environment.avatars.length-1];

  get puntuacion() {
    return this.comment?.puntuacion / 2;
  }
  get username() {
    return this.comment?.user?.name;
  }
  get avatar() {
    return this.comment.user?.img || this.defaultAvatar;
  }

  constructor( ) { }

  ngOnInit(): void {

  }

  onEditEmit() {
    this.onEdit.emit(true);
  }

  onDeteleEmit() {
    Swal.fire({
      title: '¿Eliminar comentario?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: 'green',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'red',
      confirmButtonText: 'Eliminar'
    }).then(res => {
      if (res.isConfirmed) {
        this.onDelete.emit(this.comment.id);
      } else if (res.isDismissed || res.dismiss == Swal.DismissReason.backdrop) {
        failToast('Acción cancelada');
      }
    });
  }

}
