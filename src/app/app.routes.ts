import {Routes} from '@angular/router';

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
  {
    path: '',
    loadComponent: () =>
      import('./pages/features/main/main.component').then(
        (m) => m.MainComponent
      ),
    children: [
      {
        path: 'flight-ticket-list',
        loadComponent: () =>
          import(
            './pages/features/fight-ticket-list/fight-ticket-list.component'
            ).then((m) => m.FightTicketListComponent),
      },
    ],
  },
];
