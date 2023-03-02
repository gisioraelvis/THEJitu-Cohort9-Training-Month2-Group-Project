import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';

import { ActivatedRoute, Params, RouterModule} from '@angular/router';
import { OrdersService } from '../Services/ProductService/orders.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  

  orders: any[] = [];
  constructor(private  OrdersService: OrdersService, private route:ActivatedRoute){}
  
  ngOnInit(): void {
  this.route.queryParams.subscribe((params:Params)=>{
    this. OrdersService.getOrders().pipe(map(x=>{
      let orderArray=[]
      for(let key in x){
        orderArray.push({...x[key], id:key})
      }
      return orderArray
    })).subscribe(order=>{
      this.orders=order
    })


  })
  }
  printTable() {
    window.print();
  }
  deleteOrders(id: string) {
    this.OrdersService.deleteOrders(id);
    // remove the deleted product from the local products array
    this.orders = this.orders.filter(order => order.id !== id);
  }
}








