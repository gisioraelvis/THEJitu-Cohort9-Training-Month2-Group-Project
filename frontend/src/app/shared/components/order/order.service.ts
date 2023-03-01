import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IOrderItem } from '../../Interfaces/order';
import { ORDERS } from 'src/app/mock-data';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  getOrders(): Observable<IOrderItem[]> {
    return of(ORDERS);
  }

  getOrder(id: number): Observable<IOrderItem | undefined> {
    return of(ORDERS.find((order) => order.id === id));
  }

  addOrder(order: IOrderItem): Observable<IOrderItem[]> {
    ORDERS.push(order);
    return of(ORDERS);
  }

  updateOrder(order: IOrderItem): Observable<IOrderItem[]> {
    const index = ORDERS.findIndex((o) => o.id === order.id);
    ORDERS[index] = order;
    return of(ORDERS);
  }

  deleteOrder(orderId: number): Observable<IOrderItem[]> {
    const index = ORDERS.findIndex((o) => o.id === orderId);
    ORDERS.splice(index, 1);
    return of(ORDERS);
  }

  deleteOrders(): Observable<IOrderItem[]> {
    ORDERS.splice(0, ORDERS.length);
    return of(ORDERS);
  }

  // TODO: Implement payment
  pay(orderId: number, phoneNumber: string): Observable<IOrderItem> {
    const index = ORDERS.findIndex((o) => o.id === orderId);
    // ORDERS[index].phoneNumber = phoneNumber;
    ORDERS[index].paymentResultStatus = 'paid';
    ORDERS[index].isPaid = true;
    ORDERS[index].paidAt = new Date().toISOString();
    return of(ORDERS[index]);
  }
}
