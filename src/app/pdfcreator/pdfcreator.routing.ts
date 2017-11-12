import { RouterModule, Routes } from '@angular/router';
import { TemplateDisplayComponent } from './template-display/template-display.component';
import { PdfcreatorComponent } from './pdfcreator.component';
import { TemplatePickerComponent } from './template-picker/template-picker.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

const PDFCreatorRoutes: Routes = [
  { path: '', component: PdfcreatorComponent, children:
    [
      { path: 'help', component: HelpPageComponent },
      { path: 'about', component: AboutPageComponent },
      { path: '', component: TemplatePickerComponent, children: [
        { path: ':id', component: TemplateDisplayComponent },
      ] },
    ] },
];

export const PDFCreatorRouter = RouterModule.forChild(PDFCreatorRoutes);
