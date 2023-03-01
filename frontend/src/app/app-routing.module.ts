import { CustomerComponent } from './customer-dashboard/customer/customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shopping/components/shop/shop.component').then(
        (c) => c.ShopComponent
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./shopping/components/product-page/product.component').then(
        (c) => c.ProductComponent
      ),
  },
  {
    path: 'customer-dashboard',
    loadChildren: () =>
      import('./customer-dashboard/customer-dashboard.module').then(
        (m) => m.CustomerDashboardModule
      ),
  },
  {
    path: 'editProfile',
    loadComponent: () =>
      import('./customer-dashboard/edit-profile/edit-profile.component').then(
        (c) => c.EditProfileComponent
      ),
  },
  {
    path: 'myOrders',
    loadComponent: () =>
      import('./customer-dashboard/my-orders/my-orders.component').then(
        (c) => c.MyOrdersComponent
      ),
  },
  {
    path: 'customer-profile',
    loadComponent: () =>
      import('./customer-dashboard/customer/customer.component').then(
        (c) => c.CustomerComponent
      ),
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
