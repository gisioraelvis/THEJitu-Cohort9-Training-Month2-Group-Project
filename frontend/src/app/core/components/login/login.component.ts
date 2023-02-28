import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Login } from '../../../shared/Interfaces/auth/interfaces/user';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private fb: FormBuilder,private router:Router, private userService:AuthService){}
private tokenKey = 'token';
error = false
errorMessage = ''

  loginForm!:FormGroup
  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.min(1)]], 
    })
  }

 

  login(){
    console.log(this.loginForm.value)
    let user:Login = this.loginForm.value
     this.userService.loginUser(user)
      .subscribe((response: Login) => {
        console.log(response);
       
        localStorage.setItem(this.tokenKey, response.JWT);
        this.userService.setLoginTrue()
        this.router.navigate(['/']);
      },error=>{
          this.error = true
          this.errorMessage = error.error
          console.log(error.error)
      });     
 
  }
}
