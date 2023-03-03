import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { Login } from 'src/app/shared/interfaces/user';
import { HttpErrorPopupComponent } from 'src/app/shared/http-error-popup/http-error-popup.component';
import { HttpErrorPopupService } from 'src/app/shared/http-error-popup/http-error-popup.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: AuthService,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}
  private tokenKey = 'token';
  error = false;
  errorMessage = '';

  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(1)]],
    });
  }

  login() {
    let user: Login = this.loginForm.value;
    this.userService.loginUser(user).subscribe(
      (response: Login) => {
        localStorage.removeItem(this.tokenKey);
        localStorage.setItem(this.tokenKey, response.JWT);
        this.userService.setLoginTrue();

        if (response.isAdmin) {
          this.router.navigate(['/admin/home']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        // this.errorMessage = error.error.message;
        this.httpErrorPopupService.showError(error.status, error.error.message);
      }
    );
  }
}
