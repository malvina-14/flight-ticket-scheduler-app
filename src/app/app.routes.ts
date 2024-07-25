import {Routes} from '@angular/router';
import {AuthGuard} from "./auth/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'flight-ticket-list',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/features/login/login.component').then(
        c => c.LoginComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./auth/features/signup/signup.component').then(
        c => c.SignupComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/features/main/main.component').then(
        (c) => c.MainComponent
      ),
    children: [
      {
        path: 'flight-ticket-list',
        loadComponent: () =>
          import(
            './pages/features/fight-ticket-list/fight-ticket-list.component'
            ).then((c) => c.FightTicketListComponent),
        canActivate: [AuthGuard],

      },
      {
        path: 'chart-data',
        loadComponent: () =>
          import(
            './pages/features/chart-data/chart-data.component'
            ).then((m) => m.ChartDataComponent),
        canActivate: [AuthGuard],

      },
    ],
  },
  {
    path: '**',
    redirectTo: 'flight-ticket-list',
  },
];
