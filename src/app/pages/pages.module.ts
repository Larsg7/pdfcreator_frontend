import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MaterialModule } from '../module/material.module';
import { ServiceModule } from '../services/service.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routing';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ServiceModule,
    RouterModule.forChild(PagesRoutes),
  ],
  declarations: [
    AboutPageComponent,
    HelpPageComponent,
    LandingPageComponent,
  ]
})
export class PagesModule { }
