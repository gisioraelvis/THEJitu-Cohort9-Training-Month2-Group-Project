import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './admin/product/product.component';
import { UsersComponent } from './admin/users/users.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { SoftDeleteComponent } from './admin/soft-delete/soft-delete.component';
import { AddUsersComponent } from './admin/users/add-users/add-users.component';
import { AddProductsComponent } from './admin/product/add-products/add-products.component';
import { AddOrderComponent } from './admin/orders/add-order/add-order.component';
import { CorouselComponent } from './admin/corousel/corousel.component';


const routes: Routes = [
  { path: '', redirectTo: '/corousel', pathMatch: 'full' },
  {path:'corousel',component:CorouselComponent},
  {path:'product',component:ProductComponent},
  {path:'users',component:UsersComponent},
  {path:'orders',component:OrdersComponent},
  {path:'soft-delete',component:SoftDeleteComponent},
  {path:'users/add-users',component:AddUsersComponent},
  {path:'product/add-products',component:AddProductsComponent},
  {path:'orders/add-order',component:AddOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
