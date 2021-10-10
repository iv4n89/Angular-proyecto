import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { BlurDirective } from './directives/blur.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { AdminOnlyDirective } from './directives/admin-only.directive';
import { FormErrorMessageDirective } from './directives/form-error-message.directive';
import { AutoSizeDirective } from './directives/auto-size.directive';
import { BigStarsComponent } from './helpers/rating/big-stars/big-stars.component';
import { NgxStarsModule } from 'ngx-stars';



@NgModule({
  declarations: [
    SideNavComponent,
    BlurDirective,
    BuscadorComponent,
    AdminOnlyDirective,
    FormErrorMessageDirective,
    AutoSizeDirective,
    BigStarsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxStarsModule
  ],
  exports: [
    SideNavComponent,
    AdminOnlyDirective,
    FormErrorMessageDirective,
    AutoSizeDirective,
    BigStarsComponent
  ]
})
export class SharedModule { }
