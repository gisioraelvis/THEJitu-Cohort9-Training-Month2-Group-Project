import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { ICartItem } from 'src/app/shared/interfaces/cart';
import { IProductObject } from 'src/app/shared/interfaces/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  cartProducts: IProductObject[] = [];
  cartTotal: number = 0;
  loading: boolean = true;


  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.cartService.getCartProducts().subscribe((cartProducts) => {
        this.cartProducts = cartProducts;
        this.cartService.getCartTotal().subscribe((cartTotal) => {
          this.cartTotal = cartTotal;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
      });
    });
  }

  getCartProductQty(cartProductId: number): number {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem.productId === cartProductId
    );
    return cartItem?.qty || 1;
  }

  deleteCartItem(cartProductId: number): void {
    this.loading = true;
    this.cartService.deleteCartItem(cartProductId).subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.cartService.getCartProducts().subscribe((cartProducts) => {
        this.cartProducts = cartProducts;
        this.cartService.getCartTotal().subscribe((cartTotal) => {
          this.cartTotal = cartTotal;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
      });
    });
  }

  updateCartItem(cartItem: ICartItem): void {
    this.cartService.updateCartItem(cartItem).subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.cartService.getCartProducts().subscribe((cartProducts) => {
        this.cartProducts = cartProducts;
        this.cartService.getCartTotal().subscribe((cartTotal) => {
          this.cartTotal = cartTotal;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
      });
    });
  }

  // TODO: find cleaner way
  // given product id return id of product in cart
  getProductIdAsCartItemId(productId: number): number {
    const cartItemId = this.cartItems?.find(
      (cartItem) => cartItem.productId === productId
    );
    return cartItemId!.id as number;
  }

  /* 
  {
    "message": "Order created successfully",
    "order": [
        {
            "id": 1006,
            "userId": 2002,
            "shippingAddress": "",
            "paymentMethod": "",
            "paymentResultId": null,
            "paymentResultStatus": "Pending",
            "taxPrice": null,
            "shippingPrice": null,
            "totalPrice": 19.99,
            "isPaid": false,
            "paidAt": null,
            "isDelivered": false,
            "deliveredAt": null,
            "createdAt": "2023-03-02T15:50:47.503Z",
            "updatedAt": "2023-03-02T15:50:47.503Z"
        }
    ]
}
  */
  // pass cartTotal, get the orderId and navigate to user/orders/:id
  checkOut(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // TODO: add types
    this.cartService.checkOut(this.cartTotal).subscribe((order: any) => {
      console.log(order);
      this.router.navigate([`/user/orders/${order.order[0].id}`]);
    });
  }
}
