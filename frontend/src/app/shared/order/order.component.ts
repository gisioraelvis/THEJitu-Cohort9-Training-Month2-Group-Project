import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GoBackComponent } from '../go-back/go-back.component';
import { IOrderItem } from '../interfaces/order';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrderService } from './order.service';

@Component({
  standalone: true,
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    GoBackComponent,
    LoadingSpinnerComponent,
  ],
})
export class OrderComponent implements OnInit {
  order!: IOrderItem;
  phoneNumber!: string;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(orderId).subscribe((order: any) => {
      this.order = order;
      this.loading = false;
    });
  }

  // TODO: Get order products
  // getOrderProducts() {
  //   this.cartService.getCartProducts().subscribe((cartProducts) => {
  //     this.cartProducts = cartProducts;
  //   });
  // }

  // TODO: Implement payment
  pay(): void {
    this.orderService
      .pay(this.order.id, this.phoneNumber)
      .subscribe((result: any) => {
        this.order = result;
      });
  }
}
