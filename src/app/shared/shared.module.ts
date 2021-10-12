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
import { CollapsedNavbarComponent } from './components/collapsed-navbar/collapsed-navbar.component';



@NgModule({
  declarations: [
    SideNavComponent,
    BlurDirective,
    BuscadorComponent,
    AdminOnlyDirective,
    FormErrorMessageDirective,
    AutoSizeDirective,
    BigStarsComponent,
    CollapsedNavbarComponent
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
    BigStarsComponent,
    CollapsedNavbarComponent
  ]
})
export class SharedModule { }
