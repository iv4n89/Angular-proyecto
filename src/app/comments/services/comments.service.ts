import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AllCommentsResponse, Comment, CommentResponse, ICommentService } from '../interfaces/comments.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/auth/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService implements ICommentService {

  private url: string = 'http://localhost:3000/api';

  constructor( private http: HttpClient, private userService: UserService ) { }
  getAllComments(filmId: number): Observable<AllCommentsResponse> {
    return this.http.get<AllCommentsResponse>(`${this.url}/comments/film/${filmId}`)
      .pipe(
        map(response => {
          for (let com of response.comments) {
            this.userService.getOneUser(com.UserId).subscribe(user => com.user = user);
          }
          return response;
          })
        );
  }
  getOneComment(filmId: number, commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.url}/comments/film/${filmId}/${commentId}`);
  }
  getOneCommentByUser(filmId: number): Observable<CommentResponse> {
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token')!);
    return this.http.get<CommentResponse>(`${this.url}/comments/byuser/${filmId}`, { headers })
      .pipe(
        catchError(error => of(error.message))
      );
  }
  insertOneComment(filmId: number, comment: Comment): Observable<Comment> {
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token')!);
    return this.http.post<Comment>(`${this.url}/comments/film/${filmId}`, comment, { headers });
  }
  updateOneComment(filmId: number, id:number, comment: Comment): Observable<Comment> {
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token')!);
    return this.http.put<Comment>(`${this.url}/comments/film/${filmId}/${id}`, comment, { headers });
  }
  deleteOneComment(filmId: number, commentId: number): Observable<void> {
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token')!);
    return this.http.delete<void>(`${this.url}/comments/film/${filmId}/${commentId}`, { headers });
  }
}
