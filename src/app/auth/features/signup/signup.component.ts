import {Component} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

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
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : {mismatch: true};
  }

  signUp(): void {
    if (this.signUpForm.valid) {

      this.showSnackbar('Sign up successful!');
      this.router.navigate(['/login']);
    } else {

      this.showSnackbar('Sign up  failed. Please try again.');
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
