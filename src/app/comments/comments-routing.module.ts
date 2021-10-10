import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentComponent } from './pages/add-comment/add-comment.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'film/:id', component: AddCommentComponent },
      { path: '**', redirectTo: '/films/list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
