import { Routes } from '@angular/router';
import { TemplateDisplayComponent } from './template-display/template-display.component';
import { PdfcreatorComponent } from './pdfcreator.component';
import { TemplatePickerComponent } from './template-picker/template-picker.component';
import { HelpPageComponent } from '../pages/help-page/help-page.component';
import { AboutPageComponent } from '../pages/about-page/about-page.component';

export const PDFCreatorRoutes: Routes = [
  { path: 'app', component: PdfcreatorComponent, children:
    [
      { path: 'help', component: HelpPageComponent },
      { path: 'about', component: AboutPageComponent },
      { path: '', component: TemplatePickerComponent, children: [
        { path: ':id', component: TemplateDisplayComponent },
      ] },
    ] },
];
