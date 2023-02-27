// import { Component } from '@angular/core';
// import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms"
// @Component({
//   selector: 'app-add-users',
//   templateUrl: './add-users.component.html',
//   styleUrls: ['./add-users.component.css']
// })


// export class AddUsersComponent {
//   SignupForm!: FormGroup;
//   constructor(private fb:FormBuilder){}
//   ngOnInit():void{
//    this.SignupForm= this.fb.group({
//        name: ['',Validators.required],
//        email: ['',Validators.required],
//        Confirmpassword: ['',Validators.required],
//        password: ['',Validators.required],
//    })
//   }

//  private validateAllFormFields(formGroup:FormGroup){
//  Object.keys(formGroup.controls).forEach(field =>{
//    const control = formGroup.get(field);
//    if(control instanceof FormControl){
//      control.markAsDirty({onlySelf:true})
//    }else if(control instanceof FormGroup){
//      this.validateAllFormFields(control)
//    }
//  })
//  }
//  onSubmit(){
//   if(this.SignupForm.valid){
//     console.log(this.SignupForm.value);
//     this.SignupForm.reset()
//   }else{
  
//   //  alert("This form is invalid")
//   console.log( this.validateAllFormFields(this.SignupForm))
//   }


// } }
 
 
 


import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent {
  SignupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      Confirmpassword: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (this.SignupForm.valid) {
      const url = 'https://angul-a3143-default-rtdb.firebaseio.com/Users.json';
      const formData = this.SignupForm.value;
      this.http.post(url, formData).subscribe((response) => {
        console.log(response);
        this.SignupForm.reset();
      });
    } else {
      console.log(this.validateAllFormFields(this.SignupForm));
    }
  }
}

