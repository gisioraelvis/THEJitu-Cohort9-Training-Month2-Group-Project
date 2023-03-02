// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { map } from 'rxjs';
// import { Product } from '../Interfaces';
// import { ProductService } from '../Services/ProductService/product.service';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css'],
//   standalone: true,
//   imports: [CommonModule,RouterModule]
// })
// export class ProductsComponent implements OnInit {
//   show!:boolean
//   errorState=false
//   errorMessage=''
//     products:Product[]=[]
//   categories:string[]=[]
//   constructor(private productService:ProductService , private router:Router, 
//     private route:ActivatedRoute
//     ){}
//   ngOnInit(): void {
//     // this.products
//     console.log(this.errorState);
    
//     this.show=true
//     this.productService.getProducts().pipe(map(x=>{
//       let productsArray=[]
//       for(let key in x){
//         productsArray.push({...x[key], id:key})
//       }
//       return productsArray
//     })).subscribe(product=>{
//       this.show=false
//       console.log(product);
//       this.products=product
//       this.productService.products=product
//       // console.log(this.productService.getProductCategories());
//       this.categories=this.productService.getProductCategories()
//     }, 
//     (error)=>{
//       this.errorState=true 
//       this.errorMessage=error.message
               
//     })
  
       
//   }
//   LoadAdd(){
//     this.router.navigate(['2'], {relativeTo:this.route})
//   }

//   showProducts(c:string){
//     this.router.navigate(['category','all'],{relativeTo:this.route,
//       queryParams:{category:c}})
//   }
// }
