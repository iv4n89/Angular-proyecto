import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarsModule } from 'ngx-stars';

import { AddCommentComponent } from './pages/add-comment/add-comment.component';
import { CommentsRoutingModule } from './comments-routing.module';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';
import { HomeComponent } from './pages/home/home.component';
import { MainCommentsLoaderComponent } from './components/main-comments-loader/main-comments-loader.component';
import { SingleCommentComponent } from './components/single-comment/single-comment.component';
import { SharedModule } from '../shared/shared.module';
import { FilmInfoComponent } from './components/film-info/film-info.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddCommentComponent,
    MainCommentsLoaderComponent,
    SingleCommentComponent,
    EditCommentComponent,
    FilmInfoComponent,
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgxStarsModule,
    SharedModule
  ]
})
export class CommentsModule { }
