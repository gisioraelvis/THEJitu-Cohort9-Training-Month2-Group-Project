import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Product } from '../../Interfaces';
import { ProductService } from '../../Services/ProductService/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule]
})
export class CategoryComponent implements OnInit {

  products:Product[]=[]
  constructor(private productService:ProductService, private route:ActivatedRoute){}
  
  ngOnInit(): void {
  this.route.queryParams.subscribe((params:Params)=>{
    this.products=this.productService.getProductinaCategory(params['category'])
  })
  }

}
