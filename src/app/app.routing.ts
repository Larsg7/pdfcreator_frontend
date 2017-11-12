import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: '', loadChildren: 'app/pages/pages.module#PagesModule' },
  { path: 'app', loadChildren: 'app/pdfcreator/pdfcreator.module#PdfcreatorModule' },
  { path: '**', component: PageNotFoundComponent },
];
