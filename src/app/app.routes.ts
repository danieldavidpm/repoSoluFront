import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/layout/public-layout.component')
        .then(m => m.PublicLayoutComponent),
    loadChildren: () =>
      import('./features/public/public.routes')
        .then(m => m.publicRoutes),
  },
  {
    path: 'saigna/login',
    loadComponent: () =>
      import('./features/private/pages/login/login.component')
        .then(m => m.LoginComponent),
  },
  {
    path: 'saigna',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/private/layout/private-layout.component')
        .then(m => m.PrivateLayoutComponent),
    loadChildren: () =>
      import('./features/private/private.routes')
        .then(m => m.privateRoutes),
  },
  { path: '**', redirectTo: '' },
];
