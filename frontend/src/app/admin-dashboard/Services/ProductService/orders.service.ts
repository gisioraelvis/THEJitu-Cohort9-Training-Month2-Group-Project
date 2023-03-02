import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../Interfaces';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // private OrdesApi = 'https://angul-a3143-default-rtdb.firebaseio.com/Orders.json'; 
   
  // constructor(private http: HttpClient) { }
  
  // getOrders(): Observable<any> {
  //   return this.http.get<any>(this.OrdesApi);
  // }







  public orders:Order[]=[]

  constructor(private http:HttpClient) { }

  // addOrder(order:Order):void{
  //   // this.products.push(product)
  //     this.http.post('https://angul-a3143-default-rtdb.firebaseio.com/Orders.json',order)
  //     .subscribe(response=>{
  //       console.log(response);
  //     })
  //     }

  getOrders():Observable<Order[]>{
    // return this.products
    return this.http.get<Order[]>('https://angul-a3143-default-rtdb.firebaseio.com/Orders.json')
  }

  getOneOrder(id:string):Observable<Order> {
    return this.http.get<Order>(`https://angul-a3143-default-rtdb.firebaseio.com/Orders/${id}.json`)
  }

  updateOrder(id:string, order:Order){
  
    this.http.put(`https://angul-a3143-default-rtdb.firebaseio.com/Orders/${id}.json`,order).subscribe(response=>{
      console.log(response);
      
    })
  }
 




















  
  deleteOrders(id:string){
    this.http.delete(`https://angul-a3143-default-rtdb.firebaseio.com/Orders/${id}.json`).subscribe(response=>{
      console.log(response);
    })
  }
}