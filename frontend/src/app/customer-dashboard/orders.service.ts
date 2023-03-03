import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IOrder } from './interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  // order$ = new Subject<IOrder[]>()

  // getUserOrders() {
  //   this.http.get<IOrder[]>('http://localhost:5500/api/orders/myorders').subscribe(response => {
  //     this.order$.next(response)
  //   })
  //   console.log(this.order$);

  // }

  getUserOrders(): Observable<IOrder[]> {
    const accessToken = localStorage.getItem('token') || ' ';
    return this.http.get<IOrder[]>(
      'http://localhost:5500/api/orders/myorders',
      {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + accessToken
        ),
      }
    );
  }
}
