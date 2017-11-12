import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MaterialModule } from '../module/material.module';
import { ServiceModule } from '../services/service.module';
import { PagesRouter } from './pages.routing';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PagesRouter,
  ],
  declarations: [
    LandingPageComponent,
  ]
})
export class PagesModule { }
