import { Injectable } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpErrorPopupService } from '../../shared/http-error-popup/http-error-popup.service';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/constants';

import { ICartItem } from 'src/app/shared/interfaces/cart';
import { IProductObject } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IOrderItem } from 'src/app/shared/interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService,
    private httpErrorPopupService: HttpErrorPopupService,
    private authService: AuthService
  ) {}


  token = this.localStorage.getToken() as string;

  addToCart(productId: number, qty: number): Observable<ICartItem[]> {
    return this.http
      .post<ICartItem[]>(
        `${API_URL}/cart`,
        { productId, qty },
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
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

  getCartItems(): Observable<ICartItem[]> {
    return this.http
      .get<ICartItem[]>(`${API_URL}/cart`, {
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

  getCartItem(id: number): Observable<ICartItem | undefined> {
    return this.http
      .get<ICartItem>(`${API_URL}/cart/${id}`, {
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

  addCartItem(cartItem: ICartItem): Observable<ICartItem[]> {
    return this.http
      .post<ICartItem[]>(`${API_URL}/cart`, cartItem, {
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

  updateCartItem(cartItem: ICartItem): Observable<ICartItem[]> {
    return this.http
      .put<ICartItem[]>(`${API_URL}/cart/${cartItem.id}`, cartItem, {
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

  deleteCartItem(cartProductId: number): Observable<ICartItem[]> {
    return this.http
      .delete<ICartItem[]>(`${API_URL}/cart/${cartProductId}`, {
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

  deleteCartItems(): Observable<ICartItem[]> {
    return this.http
      .delete<ICartItem[]>(`${API_URL}/cart`, {
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

  // getCartProducts(): Observable<IProductObject[]> {
  //   const cartProducts: IProductObject[] = [];
  //   CARTITEMS.forEach((cartItem) => {
  //     this.productService
  //       .getProduct(cartItem.productId)
  //       .subscribe((product) => cartProducts.push(product));
  //   });
  //   return of(cartProducts);
  // }

  getCartProducts(): Observable<IProductObject[]> {
    const cartProducts: IProductObject[] = [];
    return new Observable((observer) => {
      this.getCartItems().subscribe((cartItems) => {
        if (cartItems.length > 0) {
          cartItems.forEach((cartItem) => {
            this.productService
              .getProduct(cartItem.productId)
              .subscribe((product) => {
                cartProducts.push(product);
                observer.next(cartProducts);
              });
          });
        } else {
          observer.next(cartProducts);
        }
      });
    });
  }

  // getCartTotal(): Observable<number> {
  //   let total = 0;
  //   this.getCartProducts().subscribe((cartProducts) => {
  //     cartProducts.forEach((cartProduct) => {
  //       total += cartProduct.price;
  //     });
  //   });
  //   return of(total);
  // }

  getCartTotal(): Observable<number> {
    let total = 0;
    return new Observable((observer) => {
      this.getCartProducts().subscribe((cartProducts) => {
        cartProducts.forEach((cartProduct) => {
          total += cartProduct.price;
        });
        observer.next(total);
      });
    });
  }

  // get cart/checkout?totalPrice=19.99
  checkOut(cartTotal: number): Observable<IOrderItem[]> {
    return this.http
      .get<IOrderItem[]>(`${API_URL}/cart/checkout?totalPrice${cartTotal}`, {
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

}
