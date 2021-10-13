import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

import { Comment } from '../../interfaces/comments.interfaces';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['../../styles/comments.styles.css']
})
export class EditCommentComponent implements OnInit {

  @Input() comment!: Comment;
  @Output() onEdit: EventEmitter<Comment> = new EventEmitter();
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter();

    commentForm: FormGroup = this.fb.group({
      descripcion: ['', [Validators.required]],
      puntuacion: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
      FilmId: [0],
      UserId: [0]
    });

  innerWidth: number;

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
    return this.UserService.getUserImage(this.authService.user);
  }
  get screen() {
    if (this.innerWidth >= 570) {
      return 4;
    } else {
      return 2;
    }
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private UserService: UserService) {
    this.innerWidth = window.innerWidth;
  }

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

  onCancelEmit() {
    this.onCancel.emit(false);
    window.scrollTo(0, document.body.scrollHeight);
  }

  onRating(value: number) {
    this.puntuacion = value;
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

}
