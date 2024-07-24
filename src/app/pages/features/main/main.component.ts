import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
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
  ) {
  }

  logout() {
    this.authService.logout()

  }
}
