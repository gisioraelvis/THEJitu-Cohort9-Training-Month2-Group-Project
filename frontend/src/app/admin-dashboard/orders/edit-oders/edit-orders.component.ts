import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateComponent, Order, Product } from '../../Interfaces';
import { OrdersService } from '../../Services/ProductService/orders.service';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-oders.component.html',
  styleUrls: ['./edit-orders.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule]
})
export class OrderEditComponent implements OnInit, CanDeactivateComponent {
  form!:FormGroup
  order!:Order
  updated=false

  constructor(
    private fb: FormBuilder, 
    private route:ActivatedRoute,
    private router:Router,
    private orderService:OrdersService

  ) {
    this.route.params.subscribe((params: Params) => {
       this.orderService.getOneOrder(params['id']).subscribe(response =>{
        this.order= response;   this.form.setValue({
          shippingAddress: this.order.shippingAddress,
          paymentMethod: this.order.paymentMethod,
          totalPrice: this.order.totalPrice,
          isDelivered: this.order.isDelivered
        });
        console.log(response)
      });
    
    
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
    shippingAddress: [null, Validators.required],
    paymentMethod: [null, Validators.required],
     totalPrice: [null, Validators.required],
     isDelivered :[null, Validators.required],

    });
    this.route.params.subscribe((response)=>{console.log(response)})
  }



  updateOrder(){
    let order:Order= {...this.order ,...this.form.value}
    this.orderService.updateOrder(this.order.id, order)
    this.router.navigate(['../'],{relativeTo:this.route})
    this.updated=true
  }




  canDeactive():boolean | Promise<boolean> | Observable<boolean>{
   
    if((
    this.form.value.shippingAddress !== this.order.shippingAddress||
    this.form.value.paymentMethod !== this.order.paymentMethod ||
    this.form.value.totalPrice !== this.order.totalPrice ||
     this.form.value.isDelivered !== this.order.isDelivered 
    ) && !this.updated){
     const prom= new Promise<boolean>((resolve,reject)=>{
        setTimeout(()=>{
        resolve(confirm('Are you Sure you want to Discard the Changes'))
        },1000)
     })
     return prom
    }else{
      return true
    }
  };
}
