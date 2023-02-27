import { Component } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms"
@Component({
  selector: 'app-add-products',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {



        OrderForm!: FormGroup;
  constructor(private fb:FormBuilder){}
  ngOnInit():void{
   this.OrderForm= this.fb.group({
    shippingAddress: ['',Validators.required],
    paymentMethod: ['',Validators.required],
    totalPrice : ['',Validators.required],
   })
  }

 private validateAllFormFields(formGroup:FormGroup){
 Object.keys(formGroup.controls).forEach(field =>{
   const control = formGroup.get(field);
   if(control instanceof FormControl){
     control.markAsDirty({onlySelf:true})
   }else if(control instanceof FormGroup){
     this.validateAllFormFields(control)
   }
 })
 }

 onSubmit(){
  if(this.OrderForm.valid){
    console.log(this.OrderForm.value);
    this.OrderForm.reset()
  }else{
  
  //  alert("This form is invalid")
  console.log( this.validateAllFormFields(this.OrderForm))
  }

} }
 
 
 




// <div class="form-group">
// <label for="email">email</label>
// <input
//   type="text"
//   id="email"
//   formControlName="email"
//   class="form-control">
// <span
//   *ngIf="!signupForm.get('userData.email').valid && signupForm.get('userData.email').touched"
//   class="help-block">Please enter a valid email!</span>
// </div>