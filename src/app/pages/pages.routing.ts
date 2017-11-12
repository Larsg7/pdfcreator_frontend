import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

const PagesRoutes: Routes = [
  { path: '', component: LandingPageComponent },
];

export const PagesRouter = RouterModule.forChild(PagesRoutes);
