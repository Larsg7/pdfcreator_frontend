import { Routes } from '@angular/router';
import { TemplateDisplayComponent } from './template-display/template-display.component';
import { PdfcreatorComponent } from './pdfcreator.component';
import { TemplatePickerComponent } from './template-picker/template-picker.component';

export const PDFCreatorRoutes: Routes = [
  { path: 'app', component: PdfcreatorComponent, children:
    [
      { path: '', component: TemplatePickerComponent, children: [
        { path: ':id', component: TemplateDisplayComponent },
      ] },
    ] },
];
