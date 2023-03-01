import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../orders.service';
import { RouterModule } from '@angular/router';
import { IOrder } from '../interface';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: IOrder[]=[]
  

  constructor(public ordersService:OrdersService){

  }

  ngOnInit(): void {

    this.ordersService.getUserOrders().subscribe((order)=>{
      this.orders = order
    })

    
    
  }
  // console.log(this.orderService.order$)

  
}
