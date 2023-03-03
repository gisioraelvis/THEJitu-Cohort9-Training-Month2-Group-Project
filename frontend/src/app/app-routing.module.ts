import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactiveService } from './customer-dashboard/can-deactivate.service';
import { AuthguardService } from './shared/services/guard/authguard.service';

const routes: Routes = [
  // shopping routes
  {
    path: '',
    loadComponent: () =>
      import('./shopping/shop/shop.component').then((c) => c.ShopComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./core/login/login.component').then((l) => l.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./core/register/register.component').then(
        (r) => r.RegisterComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./shopping/cart/cart.component').then((c) => c.CartComponent),
    canActivate: [AuthguardService],
  },
  {
    path: 'shipping',
    loadComponent: () =>
      import('./shopping/shipping/shipping.component').then(
        (s) => s.ShippingComponent
      ),
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./shopping/payment/payment.component').then(
        (p) => p.PaymentComponent
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./shopping/cart/cart.component').then((c) => c.CartComponent),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./shopping/product-page/product.component').then(
        (c) => c.ProductComponent
      ),
  },
  {
    path: 'user/orders/:id',
    loadComponent: () =>
      import('./shared/order/order.component').then((c) => c.OrderComponent),
    // canActivate: [AuthguardService],
  },
  // admin dashboard routes
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.routes').then(
        (mod) => mod.ADMIN_ROUTES
      ),
  },
  // customer dashboard routes
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./customer-dashboard/customer/customer.component').then(
        (c) => c.CustomerComponent
      ),
    children: [
      {
        path: 'dashboard/edit-profile',
        canDeactivate: [CanDeactiveService],
        loadComponent: () =>
          import(
            './customer-dashboard/edit-profile/edit-profile.component'
          ).then((c) => c.EditProfileComponent),
      },
      {
        path: 'dashboard/my-orders',
        loadComponent: () =>
          import('./customer-dashboard/my-orders/my-orders.component').then(
            (c) => c.MyOrdersComponent
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./customer-dashboard/my-orders/my-orders.component').then(
            (c) => c.MyOrdersComponent
          ),
      },
    ],
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
export class AppRoutingModule { }