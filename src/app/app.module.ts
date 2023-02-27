import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {  ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './admin/home/home.component';
import { ProductComponent } from './admin/product/product.component';
import { UsersComponent } from './admin/users/users.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { SoftDeleteComponent } from './admin/soft-delete/soft-delete.component';
import { AddUsersComponent } from './admin/users/add-users/add-users.component';
import { AddProductsComponent } from './admin/product/add-products/add-products.component';
import { AddOrderComponent } from './admin/orders/add-order/add-order.component';
import { CorouselComponent } from './admin/corousel/corousel.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    UsersComponent,
    OrdersComponent,
    SoftDeleteComponent,
    AddUsersComponent,
    AddProductsComponent,
    AddOrderComponent,
    CorouselComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ReactiveFormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
