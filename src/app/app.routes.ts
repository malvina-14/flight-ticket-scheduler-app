import {Routes} from '@angular/router';
import {AuthGuard} from "./auth/guards/auth.guard";
import {LoginComponent} from "./auth/features/login/login.component";
import {SignupComponent} from "./auth/features/signup/signup.component";
import {MainComponent} from "./pages/features/main/main.component";
import {FightTicketListComponent} from "./pages/features/fight-ticket-list/fight-ticket-list.component";
import {ChartDataComponent} from "./pages/features/chart-data/chart-data.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'flight-ticket-list',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'flight-ticket-list',
        component: FightTicketListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'chart-data',
        component: ChartDataComponent,
        canActivate: [AuthGuard]
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'flight-ticket-list',
  },
];
