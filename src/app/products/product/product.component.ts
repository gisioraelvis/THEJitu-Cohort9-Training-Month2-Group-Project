import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Product } from '../../Interfaces';
import { ProductService } from '../../Services/ProductService/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductComponent implements OnInit  {
product!:Product
show!:boolean
id=''
constructor(private route:ActivatedRoute, private router:Router,
  private productService:ProductService) {
}

ngOnInit(): void {
  this.route.params.subscribe((params:Params)=>{
  this.id=params['id']
  })

  this.route.data.subscribe((data:Data)=>{
    this.product= data['product']
    // console.log(data);
    
  })

  this.route.queryParams.subscribe((params:Params)=>{
    console.log(params['showPrice']);
    params['showPrice']==='true'?this.show=true:this.show=false
    // this.product=this.productService.getOneProduct(+params['id'])
  })

}

Update(){
this.router.navigate(['edit'], {relativeTo:this.route})
}

Delete(){
this.productService.deleteProduct(this.id)
}
}
