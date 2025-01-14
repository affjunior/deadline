import { Routes } from '@angular/router';
import { DeadlineComponent } from './pages/deadline/deadline.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'deadline',
  },
  {
    path: 'deadline',
    loadComponent: () => import('./pages/deadline/deadline.component').then(m => m.DeadlineComponent),
  }
];
