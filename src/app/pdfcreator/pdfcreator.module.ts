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
import { FormsModule } from '@angular/forms';
import { TemplateBasicsComponent } from './template-basics/template-basics.component';

@NgModule({
  declarations: [
    PdfcreatorComponent,
    TemplateDisplayComponent,
    TemplatePickerComponent,
    TemplateBasicsComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ServiceModule,
    RouterModule.forChild(PDFCreatorRoutes),
    FormsModule,
  ],
  exports: [
    PdfcreatorComponent,
    RouterModule,
  ]
})
export class PdfcreatorModule {
}
