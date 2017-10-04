import { Routes } from '@angular/router';
import { PdfcreatorComponent } from './pdfcreator/pdfcreator.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
