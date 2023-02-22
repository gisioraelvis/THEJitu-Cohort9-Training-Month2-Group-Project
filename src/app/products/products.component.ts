import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../Interfaces';
import { ProductService } from '../Services/ProductService/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule]
})
export class ProductsComponent implements OnInit {
  products:Product[]=[]
  categories:string[]=[]
  constructor(private productService:ProductService , private router:Router, 
    private route:ActivatedRoute
    ){}
  ngOnInit(): void {
    this.products= this.productService.getProducts()
    this.categories=this.productService.getProductCategories()
       
  }
  LoadAdd(){
    this.router.navigate(['2'], {relativeTo:this.route})
  }

  showProducts(c:string){
    this.router.navigate(['category','all'],{relativeTo:this.route,
      queryParams:{category:c}})
  }
}
