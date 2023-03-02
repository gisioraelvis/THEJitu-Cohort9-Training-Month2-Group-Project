import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateComponent, Product } from '../../Interfaces';
import { ProductService } from '../../Services/ProductService/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule]
})
export class EditProductComponent implements OnInit, CanDeactivateComponent {
  form!:FormGroup
  product!:Product
  updated=false

  constructor(
    private fb: FormBuilder, 
    private route:ActivatedRoute,
    private router:Router,
    private productService:ProductService
  ) {
    this.route.params.subscribe((params: Params) => {
       this.productService.getOneProduct(params['id']).subscribe(response =>{
        this.product= response;   this.form.setValue({
          name: this.product.name,
          description: this.product.description,
          image: this.product.image,
          price: this.product.price,
         
        });
        console.log(response)
      });
    
    
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
      price: [null, Validators.required],
    
    });
    this.route.params.subscribe((response)=>{console.log(response)})
  }



  UpdateProduct(){
    let product:Product= {...this.product ,...this.form.value}
    this.productService.updateProduct(this.product.id, product)
    this.router.navigate(['../'],{relativeTo:this.route})
    this.updated=true;
    this.form.reset();
  }




  canDeactive():boolean | Promise<boolean> | Observable<boolean>{
   
    if((
    this.form.value.name !== this.product.name ||
    this.form.value.description !== this.product.description ||
    this.form.value.price !== this.product.price ||
    this.form.value.image !== this.product.image 
    ) && !this.updated){
     const prom= new Promise<boolean>((resolve,reject)=>{
        setTimeout(()=>{
        resolve(confirm('Are you Sure you want to Discard the Changes'))
        },1000)
     })
     return prom
    }else{
      return true
    }
  };
}
