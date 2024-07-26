import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MdbCheckboxModule,
    ReactiveFormsModule,
    RouterLink,
    AngularFireAuthModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
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

  ngOnInit() {
    const isLogged = this.authService.getUser()
    if (isLogged) {
      this.router.navigate(['/flight-ticket-list'])
    }
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password)
        .then(() => {
          const user = this.authService.getUser();
          if (user) {
            this.snackBar.open('You are logged in successfully!', '', {
              duration: 2000,
              panelClass: ['success-snackbar'],
              verticalPosition: 'top'
            });
            const user = this.authService.getUser()

            this.router.navigate(['flight-ticket-list']);
          }
        })
        .catch((error: any) => {
          let errorMessage = 'Login failed. Please try again.';
          // Map Firebase error codes to user-friendly messages
          if (error.code === 'auth/invalid-credential') {
            errorMessage = 'There is a problem with your credentials. Please check and try again.';
          } else if (error.code === 'auth/user-disabled') {
            errorMessage = 'The user account has been disabled by an administrator.';
          } else if (error.code === 'auth/user-not-found') {
            errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
          } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'The password is invalid or the user does not have a password.';
          }

          this.snackBar.open(errorMessage, '', {
            duration: 2000,
            panelClass: ['error-snackbar'],
            verticalPosition: 'top'
          });
        });
    }
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
