import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

import Swal from 'sweetalert2';

import { Comment } from '../../interfaces/comments.interfaces';
import { environment } from 'src/environments/environment';
import { failToast } from 'src/app/shared/helpers/SwalToast.helper';
import { UserService } from 'src/app/auth/services/user.service';

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

  defaultAvatar = [...environment.avatars][environment.avatars.length - 1];
  innerWidth: number;

  get puntuacion() {
    return this.comment?.puntuacion / 2;
  }
  get username() {
    return this.comment?.user?.name;
  }
  get avatar() {
    return this.userService.getUserImage(this.comment.user!);
  }

  constructor(private userService: UserService) {
    this.innerWidth = window.innerWidth;
  }

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

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

}
