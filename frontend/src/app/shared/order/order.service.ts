import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpErrorPopupService } from '../http-error-popup/http-error-popup.service';
import { API_URL } from 'src/app/constants';
import { IOrderItem } from '../interfaces/order';
import { IProductObject } from '../interfaces/product';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private httpErrorPopupService: HttpErrorPopupService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  token = this.localStorage.getToken() as string;

  // get /api/orders/2 , jwt in header
  getOrderById(id: number): Observable<IOrderItem | undefined> {
    return this.http
      .get<IOrderItem>(`${API_URL}/orders/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
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

  // getOrders(): Observable<IOrderItem[]> {
  //   return of(ORDERS);
  // }

  // addOrder(order: IOrderItem): Observable<IOrderItem[]> {
  //   ORDERS.push(order);
  //   return of(ORDERS);
  // }

  // updateOrder(order: IOrderItem): Observable<IOrderItem[]> {
  //   const index = ORDERS.findIndex((o) => o.id === order.id);
  //   ORDERS[index] = order;
  //   return of(ORDERS);
  // }

  // deleteOrder(orderId: number): Observable<IOrderItem[]> {
  //   const index = ORDERS.findIndex((o) => o.id === orderId);
  //   ORDERS.splice(index, 1);
  //   return of(ORDERS);
  // }

  // deleteOrders(): Observable<IOrderItem[]> {
  //   ORDERS.splice(0, ORDERS.length);
  //   return of(ORDERS);
  // }

  // // TODO: Get order products
  // // getCartProducts(): Observable<IProductObject[]> {
  // //   const cartProducts: IProductObject[] = [];
  // //   ORDERS.forEach((orderItem) => {
  // //     this.productService
  // //       .getProduct(orderItem.productId)
  // //       .subscribe((product) => cartProducts.push(product));
  // //   });
  // //   return of(cartProducts);
  // // }

  // TODO: Implement payment
  // pay(orderId: number, phoneNumber: string): Observable<IOrderItem> {
  //   const index = ORDERS.findIndex((o) => o.id === orderId);
  //   // ORDERS[index].phoneNumber = phoneNumber;
  //   ORDERS[index].paymentResultStatus = 'paid';
  //   ORDERS[index].isPaid = true;
  //   ORDERS[index].paidAt = new Date().toISOString();
  //   return of(ORDERS[index]);
  // }

  pay(orderId: number, phoneNumber: string): Observable<IOrderItem> {
    return this.http
      .post<IOrderItem>(`${API_URL}/orders/${orderId}/pay`, {
        phoneNumber,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
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
}
