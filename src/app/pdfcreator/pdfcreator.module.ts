import { NgModule } from '@angular/core';
import { PdfcreatorComponent } from './pdfcreator.component';
import { TemplateDisplayComponent } from './template-display/template-display.component';
import { TemplatePickerComponent } from './template-picker/template-picker.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../module/material.module';
import { ServiceModule } from '../services/service.module';
import { RouterModule } from '@angular/router';
import { PDFCreatorRoutes } from './pdfcreator.routing';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    PdfcreatorComponent,
    TemplateDisplayComponent,
    TemplatePickerComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ServiceModule,
    RouterModule.forChild(PDFCreatorRoutes),
  ],
  exports: [
    PdfcreatorComponent,
    RouterModule,
  ]
})
export class PdfcreatorModule {
}
