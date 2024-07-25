import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }


  logout() {
    this.authService.logout()

  }

  navigateToChart() {

  }

  navigateHome() {
    this.router.navigate(['/flight-ticket-list'])

  }
}
