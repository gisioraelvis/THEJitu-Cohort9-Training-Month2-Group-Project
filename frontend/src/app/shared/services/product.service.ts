import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { PRODUCTOBJ, PRODUCTS } from 'src/app/mock-products';
import { IProduct, IProductObject } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProducts(): Observable<IProduct[]> {
    const products = of(PRODUCTS);
    return products;
  }

  getProduct(id: number): Observable<IProductObject> {
    return of(PRODUCTOBJ);
  }
}