import { Routes } from '@angular/router';

export const privateRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'consultas',
    loadComponent: () =>
      import('./pages/consultas/consultas.component').then(m => m.ConsultasComponent),
  },
];
