import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarsModule } from 'ngx-stars';

import { AddPageComponent } from './pages/add-page/add-page.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { FilmFormComponent } from './components/film-form/film-form.component';
import { FilmsRoutingModule } from './films-routing.module';
import { FiltradoComponent } from './components/filtrado/filtrado.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SelectorDeGeneroComponent } from './components/selector-de-genero/selector-de-genero.component';
import { SharedModule } from '../shared/shared.module';
import { TopListComponent } from './components/top-list/top-list.component';
import { TopListPageComponent } from './pages/top-list-page/top-list-page.component';


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
    FiltradoComponent,
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
