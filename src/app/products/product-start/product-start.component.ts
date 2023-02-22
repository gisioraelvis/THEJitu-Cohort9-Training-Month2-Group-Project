import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Product } from '../../Interfaces';
import { ProductService } from '../../Services/ProductService/product.service';

@Component({
  selector: 'app-product-start',
  templateUrl: './product-start.component.html',
  styleUrls: ['./product-start.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule]
})
export class ProductStartComponent implements OnInit {

  products:Product[]=[]
  constructor(private productService:ProductService, private route:ActivatedRoute){}
  
  ngOnInit(): void {
  this.route.queryParams.subscribe((params:Params)=>{
    this.products=this.productService.getProducts()
  })
  }
}
