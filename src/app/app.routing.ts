import { Routes } from '@angular/router';
import { PdfcreatorComponent } from './pdfcreator/pdfcreator.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: PdfcreatorComponent },
];
