import { NgModule } from '@angular/core';
import { PdfcreatorComponent } from './pdfcreator.component';
import { TemplateDisplayComponent } from './template-display/template-display.component';
import { TemplatePickerComponent } from './template-picker/template-picker.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../module/material.module';
import { ServiceModule } from '../services/service.module';
import { RouterModule } from '@angular/router';
import { PDFCreatorRouter } from './pdfcreator.routing';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { TemplateBasicsComponent } from './template-basics/template-basics.component';
import { TemplatePlaceholdersComponent } from './template-placeholders/template-placeholders.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    PdfcreatorComponent,
    TemplateDisplayComponent,
    TemplatePickerComponent,
    TemplateBasicsComponent,
    TemplatePlaceholdersComponent,
    AboutPageComponent,
    HelpPageComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PDFCreatorRouter,
    FormsModule,
    PipesModule,
  ],
  exports: [
    PdfcreatorComponent,
    RouterModule,
  ]
})
export class PdfcreatorModule {
}
