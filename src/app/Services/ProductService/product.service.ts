import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  public products:Product[]=[]

  constructor(private http:HttpClient) { }

  addProduct(product:Product):void{
    // this.products.push(product)
      this.http.post('https://angul-a3143-default-rtdb.firebaseio.com/Products.json',product)
      .subscribe(response=>{
        console.log(response);
      })
      }

  getProducts():Observable<Product[]>{
    // return this.products
    return this.http.get<Product[]>('https://angul-a3143-default-rtdb.firebaseio.com/Products.json')
  }

  getOneProduct(id:string):Observable<Product> {
    return this.http.get<Product>(`https://angul-a3143-default-rtdb.firebaseio.com/Products/${id}.json`)
  }

  // getProductCategories():string[]{
  //   let category:string[]=[];

  //   for(let c of this.products){
  //     let x = category.find(p=>p===c.category)
  //     if(!x){
  //       category.push(c.category)
  //     }
  //   }
  //   return category;
  // }

  // getProductinaCategory(categoryName:string):Product[]{
  //   let x = this.products.filter(x=>x.category===categoryName)
  //   return x
  // }

  updateProduct(id:string, product:Product){
    // let index= this.products.findIndex(x=>x.id===id)
    // this.products[index]=product
    this.http.put(`https://angul-a3143-default-rtdb.firebaseio.com/Products/${id}.json`,product).subscribe(response=>{
      console.log(response);
      
    })
  }
  // deleteProduct(id:string){
  //   this.http.delete(`https://angul-a3143-default-rtdb.firebaseio.com/Products/${id}.json`).subscribe(response=>{
  //     console.log(response);
      
  //   })
  // }

  deleteProduct(id:string){
    this.http.delete(`https://angul-a3143-default-rtdb.firebaseio.com/Products/${id}.json`).subscribe(response=>{
      console.log(response);
    })
  }
  
}
