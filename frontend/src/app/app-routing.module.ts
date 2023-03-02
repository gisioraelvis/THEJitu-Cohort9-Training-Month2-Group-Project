import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersResolverService } from './admin-dashboard/Services/Guards/order-resolver.service';
import { ProductResolverService } from './admin-dashboard/Services/Guards/product-resolver.service';
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
  // admin dashboard routes
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.routes').then(
        (mod) => mod.ADMIN_ROUTES
      ),
  },
  // {
  //   path: 'admin',
  //   loadComponent: () =>
  //     import('./admin-dashboard/corousel/corousel.component').then(
  //       (p) => p.CorouselComponent
  //     ),
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'admin/orders',
  //   loadComponent: () =>
  //     import('./admin-dashboard/orders/orders.component').then(
  //       (p) => p.OrdersComponent
  //     ),
  // },
  // {
  //   path: 'admin/orders/:id',
  //   resolve: { Order: OrdersResolverService },
  //   loadComponent: () =>
  //     import('./admin-dashboard/orders/edit-oders/edit-orders.component').then(
  //       (p) => p.OrderEditComponent
  //     ),
  // },
  // {
  //   path: 'admin/users',
  //   loadComponent: () =>
  //     import('./admin-dashboard/users/users.component').then(
  //       (p) => p.UsersComponent
  //     ),
  // },
  // {
  //   path: 'admin/users/soft-deleted',
  //   loadComponent: () =>
  //     import('./admin-dashboard/users/softdelete/softdelete.component').then(
  //       (p) => p.SoftdeleteComponent
  //     ),
  // },
  // {
  //   path: 'admin/products',
  //   loadComponent: () =>
  //     import(
  //       './admin-dashboard/products/product-start/product-start.component'
  //     ).then((p) => p.ProductStartComponent),
  // },
  // {
  //   path: 'admin/products/add-new',
  //   loadComponent: () =>
  //     import(
  //       './admin-dashboard/products/add-product/add-product.component'
  //     ).then((p) => p.AddProductComponent),
  // },
  // {
  //   path: 'admin/products/:id',
  //   loadComponent: () =>
  //     import(
  //       './admin-dashboard/products/edit-product/edit-product.component'
  //     ).then((m) => m.EditProductComponent),
  // },
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
