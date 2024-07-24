import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/features/login/login.component').then(
        m => m.LoginComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./auth/features/signup/signup.component').then(
        m => m.SignupComponent
      ),
  },
];
