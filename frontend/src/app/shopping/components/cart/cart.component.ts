import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { GoBackComponent } from 'src/app/shared/components/go-back/go-back.component';
import { CartService } from './cart.service';
import { ICartItem } from 'src/app/shared/Interfaces/cart';
import { IProductObject } from 'src/app/shared/Interfaces/product';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';

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
  cartItems?: ICartItem[];
  cartProducts?: IProductObject[];
  cartTotal: number = 0;

  constructor(private cartService: CartService) {}

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
}
