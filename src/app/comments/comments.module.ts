import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AddCommentComponent } from './pages/add-comment/add-comment.component';
import { MainCommentsLoaderComponent } from './components/main-comments-loader/main-comments-loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarsModule } from 'ngx-stars';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleCommentComponent } from './components/single-comment/single-comment.component';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    AddCommentComponent,
    MainCommentsLoaderComponent,
    SingleCommentComponent,
    EditCommentComponent,
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
