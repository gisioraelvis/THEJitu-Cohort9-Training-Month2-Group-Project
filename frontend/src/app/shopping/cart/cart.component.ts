import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { ICartItem } from 'src/app/shared/interfaces/cart';
import { IProductObject } from 'src/app/shared/interfaces/product';
import { Router, RouterModule } from '@angular/router';
import { GoBackComponent } from 'src/app/shared/go-back/go-back.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule,
    GoBackComponent,
    LoadingSpinnerComponent,
  ],
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  cartProducts?: IProductObject[];
  cartTotal: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.getCartItems();
    this.getCartProducts();
    this.getCartTotal();
  }

  getCartItems(): void {
    this.cartService
      .getCartItems()
      .subscribe((cartItems) => (this.cartItems = cartItems));
  }

  getCartTotal(): void {
    this.cartService.getCartTotal().subscribe((cartTotal) => {
      this.cartTotal = cartTotal;
    });
  }

  getCartProducts() {
    this.cartService.getCartProducts().subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
    });
  }

  getCartProductQty(cartProductId: number): number {
    const cartItem = this.cartItems?.find(
      (cartItem) => cartItem.productId === cartProductId
    );
    return cartItem?.qty || 0;
  }

  deleteCartItem(cartProductId: number): void {
    this.cartService.deleteCartItem(cartProductId).subscribe((cartItems) => {
      this.cartItems = cartItems;
    });

    this.getCartProducts();
    this.getCartTotal();
  }

  updateCartItem(cartItem: ICartItem): void {
    this.cartService.updateCartItem(cartItem).subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  checkOut() {
    // this.cartService.checkOut().subscribe((cartItems) => {
    //   this.cartItems = cartItems;
    // });
  }
}
