import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './shared/services/guard/authguard.service';

const routes: Routes = [
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
    // canActivate: [AuthguardService],
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
    // canActivate: [AuthguardService],
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./shopping/product-page/product.component').then(
        (c) => c.ProductComponent
      ),
    // canActivate: [AuthguardService]
  },
  {
    path: 'user/orders/:id',
    loadComponent: () =>
      import('./shared/order/order.component').then((c) => c.OrderComponent),
    // canActivate: [AuthguardService]
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
