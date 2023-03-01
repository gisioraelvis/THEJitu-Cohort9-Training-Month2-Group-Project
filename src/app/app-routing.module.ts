import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolverService } from './Services/Guards/product-resolver.service';
import { OrdersResolverService} from './Services/Guards/order-resolver.service';

const routes: Routes = [

      { path: 'products/product-start', loadComponent: () => import('./products/product-start/product-start.component').then(p => p.ProductStartComponent) },
      { path: 'corousel', loadComponent: () => import('./corousel/corousel.component').then(p => p.CorouselComponent), pathMatch: 'full' },
      { path: 'orders', loadComponent: () => import('./orders/orders.component').then(p => p.OrdersComponent) },
      { path: 'users', loadComponent: () => import('./users/users.component').then(p => p.UsersComponent) },
      { path: 'users/softdelete', loadComponent: () => import('./users/softdelete/softdelete.component').then(p => p.SoftdeleteComponent) },
    
      { path: 'add-new', loadComponent: () => import('./products/add-product/add-product.component').then(p => p.AddProductComponent) },
      {
        path: ':id',resolve: { Order: OrdersResolverService },
        loadComponent: () => import('./orders/edit-oders/edit-orders.component').then(p => p. OrderEditComponent)
      },
      {
        path: 'product',resolve: { product: ProductResolverService },
        loadComponent: () => import('./products/product/product.component').then(p => p.ProductComponent)
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./products/edit-product/edit-product.component').then(m => m.EditProductComponent)
      },
     
      // { path: "admin ", redirectTo: '/corousel' }
  { path: "**", redirectTo: '/notfound' },
];



// const routes: Routes = [
//   { path: 'products/product-start', Component: () => import('./products/product-start/product-start.component').then(p => p.ProductStartComponent) },
//   { path: 'corousel', component: () => import('./corousel/corousel.component').then(p => p.CorouselComponent), pathMatch: 'full' },
//   { path: 'orders', component: () => import('./orders/orders.component').then(p => p.OrdersComponent) },
//   { path: 'users', component: () => import('./users/users.component').then(p => p.UsersComponent) },
//   { path: 'users/softdelete', component: () => import('./users/softdelete/softdelete.component').then(p => p.SoftdeleteComponent) },
//   { path: 'users/addUser', component: () => import('./users/addUser/addUser.component').then(p => p.AddUserComponent)},
//   { path: 'add/new', component: () => import('./products/add-product/add-product.component').then(p => p.AddProductComponent) },
//   { path: ':id', component: () => import('./products/product/product.component').then(p => p.ProductComponent) },
//   { path: ':id/edit', component: () => import('./products/edit-product/edit-product.component').then(m => m.EditProductComponent) },   
//   { path: " ", redirectTo: '/corousel' },
//   { path: "**", redirectTo: '/notfound' },
// ];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
