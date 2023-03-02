import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProduct, Product } from '../../Interfaces';
import { ProductService } from '../../Services/ProductService/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule]
})
export class AddProductComponent implements OnInit {
  constructor( private fb: FormBuilder, private productService:ProductService) {
        
  }
  addProduct!:FormGroup
  ngOnInit(): void {
    this.addProduct= this.fb.group({
      name:[null, Validators.required],
      description:[null, Validators.required],
      image:[null, Validators.required],
      price:[null, Validators.required]
    })
  }

  AddProduct(){
    let product :Product= {...this.addProduct.value, id:Math.floor(Math.random() *10000)};
    this.productService.addProduct(product);
    this.addProduct.reset();
  }
}
