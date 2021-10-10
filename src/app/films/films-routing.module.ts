import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../auth/guards/auth-guard.guard';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { HomePageComponent } from './pages/home/home-page.component';

import { ListPageComponent } from './pages/list-page/list-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: 'list', component: ListPageComponent },
      { path: 'add', component: AddPageComponent, canActivate: [AuthGuardGuard], canLoad: [AuthGuardGuard]},
      { path: '**', redirectTo: 'list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
