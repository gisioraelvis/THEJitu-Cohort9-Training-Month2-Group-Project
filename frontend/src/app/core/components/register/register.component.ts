import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../auth/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule,HttpClientModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  error = false
  errorMessage = ''
  registerForm!:FormGroup;
  
  constructor( private fb: FormBuilder,private router:Router, private userService:AuthService){}
  // isLoggedIn=false
  private tokenKey = 'token';
  
  // / logic
     

  ngOnInit(): void {
    this.registerForm= this.fb.group({
      name:[null, Validators.required],
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.min(1)]],
      confirmPassword:[null, [Validators.required, Validators.min(1)]]  
    })
  }

 

  register(){
    console.log(this.registerForm.value)
    let user:User = this.registerForm.value
    let users: User[] = [];
    console.log(this.registerForm.value)
     this.userService.postUser(user)
      .subscribe((response: User) => {
        console.log(response);
       
        localStorage.setItem(this.tokenKey, response.JWT);
        this.userService.setLoginTrue()
        this.router.navigate(['/']);
        // users.push({ name: response.name, email: response.email, password: response.password, isAdmin: response.isAdmin=false});
      },error=>{
          this.error = true
          this.errorMessage = error.error
          console.log(error.error)
      });     
 
  }

 
}
