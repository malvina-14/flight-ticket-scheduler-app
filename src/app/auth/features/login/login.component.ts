import {Component} from '@angular/core';
import { RouterLink, RouterOutlet} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MdbCheckboxModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$')
      ]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.showSnackbar('Login succeeded!')
    } else {
      this.showSnackbar('Login failed. Please try again.');
    }

  }

  private showSnackbar(message: string): void {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    this.snackBar.open(message, 'X', config);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
