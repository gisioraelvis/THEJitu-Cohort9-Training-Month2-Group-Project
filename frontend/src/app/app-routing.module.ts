import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './shared/services/guard/authguard.service';

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
    path: 'cart',
    loadComponent: () =>
      import('./shopping/cart/cart.component').then(
        (c) => c.CartComponent
      ),
    // canActivate: [AuthguardService],
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./shopping/product-page/product.component').then(
        (c) => c.ProductComponent
      ),
    // canActivate: [AuthguardService]
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
