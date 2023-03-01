import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shopping/shop/shop.component').then(
        (c) => c.ShopComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/login/login.component').then(
        (l) => l.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./core/register/register.component').then(
        (r) => r.RegisterComponent
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./shopping/product-page/product.component').then(
        (c) => c.ProductComponent
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
    path: 'not-found',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then(
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
