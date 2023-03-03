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
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { User } from 'src/app/shared/interfaces/user';
import { HttpErrorPopupService } from 'src/app/shared/http-error-popup/http-error-popup.service';
// import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NavbarComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  error = false;
  errorMessage = '';
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: AuthService,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}
  // isLoggedIn=false
  private tokenKey = 'token';

  // / logic

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(1)]],
      confirmPassword: [null, [Validators.required, Validators.min(1)]],
    });
  }

  register() {
    console.log(this.registerForm.value);
    let user: User = this.registerForm.value;
    let users: User[] = [];
    console.log(this.registerForm.value);
    this.userService.postUser(user).subscribe(
      (response: User) => {
        // console.log(response);

        // localStorage.setItem(this.tokenKey, response.JWT);
        // this.userService.setLoginTrue();
        // this.router.navigate(['/']);
        // users.push({ name: response.name, email: response.email, password: response.password, isAdmin: response.isAdmin=false});
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
        this.error = true;
        this.errorMessage = error.error;
        console.log(error);
        this.httpErrorPopupService.showError(error.status, error.error.message);
      }
    );
  }
}
