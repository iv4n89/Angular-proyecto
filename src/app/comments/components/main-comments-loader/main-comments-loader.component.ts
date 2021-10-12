import { Component, Input, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

import { Film } from 'src/app/films/interfaces/films.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Comment } from '../../interfaces/comments.interfaces';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-main-comments-loader',
  templateUrl: './main-comments-loader.component.html',
  styleUrls: ['../../styles/comments.styles.css']
})
export class MainCommentsLoaderComponent implements OnInit {

  @Input() film!: Film;
  innerWidth: number;
  editComment: boolean = false;
  _comentario!: Comment;

  @Input() set comentario(value: Comment) {
    this._comentario = value;
  }
  get comentario() {
    return this.comentarios.filter(c => this.isMyComment(c))[0];
  }
  get isLogged() {
    return this.authService.loged;
  }
  @Input() comentarios: Comment[] = [];

  @Output() onComment: EventEmitter<Comment> = new EventEmitter();
  @Output() onDelete: EventEmitter<number> = new EventEmitter();


  get screen() {
    if (this.innerWidth >= 650) {
      return 5;
    } else {
      return 2;
    }
  }

  get filmImage() {
    if (this.film.img && !this.film.img.includes('/')) {
      return `${environment.filmsImageUrl}/${this.film.id}`;
    } else {
      return this.film.img;
    }
  }

  constructor( private authService: AuthService) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.comentario) {
        this.editComment = true;
      }
    }, 50);
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  comment(value: Comment) {
    console.log(value);
    this.onComment.emit(value);
    this.editComment = false;
  }

  isMyComment(comment: Comment) {
    return comment.UserId === this.authService.user.id;
  }

  setEditar(value: boolean) {
    this.editComment = value;
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 150);
  }

  delete(value: number) {
    this.onDelete.emit(value);
  }
}
