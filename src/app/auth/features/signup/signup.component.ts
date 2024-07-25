import {Component} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  public signUpForm: FormGroup;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router


  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$')
      ]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {mismatch: true};
  };

  signUp(): void {
    if (this.signUpForm.valid) {
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;

      this.authService.signUp(email, password)
        .then(() => {
          this.snackBar.open('Sign up successful!');
          this.router.navigate(['/login']);
        })
        .catch((error: any) => {
          let errorMessage = 'Sign up failed. Please try again.';
          // Map Firebase error codes to user-friendly messages
          if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'The email address is already in use by another account.';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'The email address is not valid.';
          } else if (error.code === 'auth/weak-password') {
            errorMessage = 'The password is too weak.';
          }

          this.snackBar.open(errorMessage, '', {
            duration: 3000,
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
