import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule} from '@angular/router';
import { Product } from '../../Interfaces';
import { ProductService } from '../../Services/ProductService/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-start',
  templateUrl: './product-start.component.html',
  styleUrls: ['./product-start.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule,]
})
export class ProductStartComponent implements OnInit {

  products:Product[]=[]
  constructor(private productService:ProductService, private route:ActivatedRoute){}
  
  ngOnInit(): void {
  this.route.queryParams.subscribe((params:Params)=>{
    this.productService.getProducts().pipe(map(x=>{
      let productsArray=[]
      for(let key in x){
        productsArray.push({...x[key], id:key})
      }
      return productsArray
    })).subscribe(product=>{
      this.products=product
    })


  })
  }
  printTable() {
    window.print();
  }
  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
    // remove the deleted product from the local products array
    this.products = this.products.filter(product => product.id !== id);
  }
}
