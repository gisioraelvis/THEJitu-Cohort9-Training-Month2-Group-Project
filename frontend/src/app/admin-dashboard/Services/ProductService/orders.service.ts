import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL } from 'src/app/constants';
import { HttpErrorPopupService } from 'src/app/shared/http-error-popup/http-error-popup.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
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

  constructor(private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService,
    private httpErrorPopupService: HttpErrorPopupService,
    private authService: AuthService) { }

  // addOrder(order:Order):void{
  //   // this.products.push(product)
  //     this.http.post('https://angul-a3143-default-rtdb.firebaseio.com/Orders.json',order)
  //     .subscribe(response=>{
  //       console.log(response);
  //     })
  //     }
  token = this.localStorage.getToken() as string;

  getOrders():Observable<Order[]>{
    // return this.products
    return this.http.get<Order[]>(`${API_URL}/orders`,{
      headers: { Authorization: `Bearer ${this.token}` },
    })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/login']);
        }
        this.httpErrorPopupService.showError(
          error.status,
          error.error.message
        );
        return throwError(error);
      })
    );
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