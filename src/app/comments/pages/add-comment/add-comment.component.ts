import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { Comment } from '../../interfaces/comments.interfaces';
import { CommentsService } from '../../services/comments.service';
import { Film } from 'src/app/films/interfaces/films.interfaces';
import { FilmsService } from 'src/app/films/services/films.service';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styles: [`
    .back-fixed {
      background-attachment: fixed;
    }
    .back-no-fixed {
      background-attachment: scroll;
    }
  `]
})
export class AddCommentComponent implements OnInit {

  filmId: number = Number(this.aR.snapshot.url[1].path);
  film: Film = { id: 0, UserId: 0, estreno: 0, titulo: '', genero: 'Sin Genero' };
  comentario!: Comment;
  comentarios: Comment[] = [];
  total: number = 0;

  constructor(private aR: ActivatedRoute, private filmService: FilmsService, private commentsService: CommentsService, private router: Router) {
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    this.filmService.getOneFilm(this.filmId).subscribe(result => {
      this.film = result;
    });
    this.buscarComentario();
    this.repoblarComentarios();
  }

  comment(comment: Comment) {
    if (!this.comentario) {
      this.commentsService.insertOneComment(this.filmId, comment)
        .subscribe(result => {
          this.repoblarComentarios();
          this.router.navigate([this.router.url]);
        });
    } else {
      this.commentsService.updateOneComment(this.filmId, this.comentario.id!, comment)
        .subscribe(response => {
          this.repoblarComentarios();
          this.router.navigate([this.router.url]);
        })
    }
  }

  delete(id: number) {
    this.commentsService.deleteOneComment(this.filmId, id)
      .subscribe(res => {
        this.router.navigate([this.router.url]);
        Swal.fire('Comentario eliminado', 'Se ha eliminado su comentario', 'success');
      })
  }

  buscarComentario() {
    this.commentsService.getOneCommentByUser(this.filmId)
      .subscribe(resp => {
        if (resp) {
          this.comentario = resp.comment!;
        }
      })
  }

  repoblarComentarios() {
    this.commentsService.getAllComments(this.filmId)
      .subscribe(response => {
        this.total = response.total;
        this.comentarios = response.comments;
      })
  }

}
