import { ProfileService } from './../profile.service';
import { RouterModule, Params, Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs"


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from '../customer/customer.component';
import { User, Profile } from '../interface';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CustomerComponent],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User ={
    name: '',
    email: '',
    password:'',
    confirmPassword:'',
    id:'',
    isAdmin: false
  }
  id=''
  updated = false

  form!: FormGroup
  constructor(private fb: FormBuilder, public profileService: ProfileService, private route:ActivatedRoute, private router:Router) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')]],
      confirmPassword: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')]]
      
    })
    this.profileService.getUserProfile().subscribe((user) => {
      this.user = user
      // users = this.
      // let custom: User[]=this.users
      console.log(user)
      this.form.setValue({
        name: this.user.name,
        email: this.user.email,
        password: '',
        confirmPassword: ''
      })
      
    })
    
  }

  
  updateProfile() {
    console.log(this.user);
    

    // let user:User={this.user}
    this.profileService.updateProfile(this.form.value)
    this.router.navigate(['/dashboard'],{relativeTo:this.route})
    this.updated=true    
  }
  
  

  canDeactive(): boolean | Promise<boolean> | Observable<boolean> {

    if ((
      this.form.value.name != this.user.name ||
      this.form.value.email != this.user.email ||
      this.form.value.password != this.user.password ||
      this.form.value.confirmPassword != this.user.confirmPassword
    ) && !this.updated) {
      const prom = new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
          resolve(confirm('Are you Sure you want to Discard the Changes'))
        }, 1000)       
      })
      console.log("confirm");
      return prom
    } else {
      return true
    }
  };

}
