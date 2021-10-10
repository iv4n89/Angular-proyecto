import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

import { Comment } from '../../interfaces/comments.interfaces';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['../../styles/comments.styles.css']
})
export class EditCommentComponent implements OnInit {

  @Input() comment!: Comment;
  @Output() onEdit: EventEmitter<Comment> = new EventEmitter();

    commentForm: FormGroup = this.fb.group({
      descripcion: ['', [Validators.required]],
      puntuacion: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
      FilmId: [0],
      UserId: [0]
    });

  get username() {
    return this.comment?.user?.name || this.authService.user.name;
  }
  get puntuacion() {
    return this.comment?.puntuacion / 2 || 2.5;
  }
  set puntuacion(value: number) {
    this.commentForm.controls['puntuacion'].setValue(value * 2);
  }
  get avatar() {
    return this.comment?.user?.img || this.authService.user.img || environment.avatars[environment.avatars.length-1];
  }

  constructor( private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.comment) {
      this.commentForm.controls['descripcion'].setValue(this.comment.descripcion);
      this.commentForm.controls['FilmId'].setValue(this.comment.FilmId);
      this.commentForm.controls['UserId'].setValue(this.comment.UserId);
      this.commentForm.controls['puntuacion'].setValue(this.comment.puntuacion);
    }
  }

  onEditEmit() {
    this.onEdit.emit(this.commentForm.value);
  }

  onRating(value: number) {
    this.puntuacion = value;
  }

}
