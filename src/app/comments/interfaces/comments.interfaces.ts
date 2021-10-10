import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interfaces';

export interface Comment {
  id?: number,
  descripcion: string,
  puntuacion: number,
  FilmId: number,
  UserId: number,
  user?: User
}

export interface CommentResponse {
  ok: boolean,
  comment?: Comment
}

export interface AllCommentsResponse {
  total: number,
  comments: Comment[];
}

export interface ICommentService {
  getAllComments(filmId: number): Observable<AllCommentsResponse>,
  getOneComment(filmId: number, commentId: number): Observable<Comment>,
  getOneCommentByUser(filmId: number): any,
  insertOneComment(filmId: number, comment: Comment): any,
  updateOneComment(filmId: number, id: number, comment: Comment): any,
  deleteOneComment(filmsId: number, commentId: number): any
}
