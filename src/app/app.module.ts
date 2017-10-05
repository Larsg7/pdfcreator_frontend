import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './module/material.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { ServiceModule } from './services/service.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from './dialogs/dialog.module';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PdfcreatorModule } from './pdfcreator/pdfcreator.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    ServiceModule,
    DialogModule,
    FormsModule,
    PdfcreatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
