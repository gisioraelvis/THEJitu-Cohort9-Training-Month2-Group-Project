import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { CARTITEMS } from 'src/app/mock-data';
import { ICartItem } from 'src/app/shared/interfaces/cart';
import { IProductObject } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private productService: ProductService) {}

  getCartItems(): Observable<ICartItem[]> {
    return of(CARTITEMS);
  }

  getCartItem(id: number): Observable<ICartItem | undefined> {
    return of(CARTITEMS.find((cartItem) => cartItem.id === id));
  }

  addCartItem(cartItem: ICartItem): Observable<ICartItem[]> {
    CARTITEMS.push(cartItem);
    return of(CARTITEMS);
  }

  updateCartItem(cartItem: ICartItem): Observable<ICartItem[]> {
    const index = CARTITEMS.findIndex((c) => c.id === cartItem.id);
    CARTITEMS[index] = cartItem;
    return of(CARTITEMS);
  }

  deleteCartItem(cartProductId: number): Observable<ICartItem[]> {
    const index = CARTITEMS.findIndex((c) => c.productId === cartProductId);
    CARTITEMS.splice(index, 1);
    return of(CARTITEMS);
  }

  deleteCartItems(): Observable<ICartItem[]> {
    CARTITEMS.splice(0, CARTITEMS.length);
    return of(CARTITEMS);
  }

  getCartProducts(): Observable<IProductObject[]> {
    const cartProducts: IProductObject[] = [];
    CARTITEMS.forEach((cartItem) => {
      this.productService
        .getProduct(cartItem.productId)
        .subscribe((product) => cartProducts.push(product));
    });
    return of(cartProducts);
  }

  getCartTotal(): Observable<number> {
    let total = 0;
    this.getCartProducts().subscribe((cartProducts) => {
      cartProducts.forEach((cartProduct) => {
        total += cartProduct.price;
      });
    });
    return of(total);
  }
}
