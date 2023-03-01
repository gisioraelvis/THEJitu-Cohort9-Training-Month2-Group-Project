import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './shared/services/guard/authguard.service';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shopping/components/shop/shop.component').then(
        (c) => c.ShopComponent
      )
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./core/components/login/login.component').then(
        (l) => l.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./core/components/register/register.component').then(
        (r) => r.RegisterComponent
      ),
  },
  {
    path: 'shipping',
    loadComponent: () =>
      import('./shopping/components/shipping/shipping.component').then(
        (s) => s.ShippingComponent
      ),
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./shopping/components/payment/payment.component').then(
        (p) => p.PaymentComponent
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
