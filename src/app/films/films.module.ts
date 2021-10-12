import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { FilmsRoutingModule } from './films-routing.module';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilmFormComponent } from './components/film-form/film-form.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { NgxStarsModule } from 'ngx-stars';
import { TopListComponent } from './components/top-list/top-list.component';
import { TopListPageComponent } from './pages/top-list-page/top-list-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectorDeGeneroComponent } from './components/selector-de-genero/selector-de-genero.component';


@NgModule({
  declarations: [
    FilmCardComponent,
    ListPageComponent,
    AddPageComponent,
    FilmFormComponent,
    HomePageComponent,
    TopListComponent,
    TopListPageComponent,
    SelectorDeGeneroComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FilmsRoutingModule,
    SharedModule,
    NgbModule,
    NgxStarsModule
  ]
})
export class FilmsModule { }
