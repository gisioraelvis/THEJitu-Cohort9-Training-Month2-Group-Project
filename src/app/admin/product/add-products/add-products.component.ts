import { Component } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms"
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  AddProduct!: FormGroup;
  constructor(private fb:FormBuilder){}
  ngOnInit():void{
   this.AddProduct= this.fb.group({
       name: ['',Validators.required],
       image: ['',Validators.required],
       description: ['',Validators.required],
       price: ['',Validators.required],
       countInStock: ['',Validators.required],
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
  if(this.AddProduct.valid){
    console.log(this.AddProduct.value);
    this.AddProduct.reset()
  }else{
  
  //  alert("This form is invalid")
  console.log( this.validateAllFormFields(this.AddProduct))
  }


} }
 
 
 




