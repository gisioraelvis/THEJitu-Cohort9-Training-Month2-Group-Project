import { Route } from '@angular/router';
import { OrdersResolverService } from './Services/Guards/order-resolver.service';

export const ADMIN_ROUTES: Route[] = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./corousel/corousel.component').then((p) => p.CorouselComponent),
    pathMatch: 'full',
  },
  {
    path: 'admin/orders',
    loadComponent: () =>
      import('./orders/orders.component').then((p) => p.OrdersComponent),
  },
  {
    path: 'admin/orders/:id',
    resolve: { Order: OrdersResolverService },
    loadComponent: () =>
      import('./orders/edit-oders/edit-orders.component').then(
        (p) => p.OrderEditComponent
      ),
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('./users/users.component').then((p) => p.UsersComponent),
  },
  {
    path: 'admin/users/soft-deleted',
    loadComponent: () =>
      import('./users/softdelete/softdelete.component').then(
        (p) => p.SoftdeleteComponent
      ),
  },
  {
    path: 'admin/products',
    loadComponent: () =>
      import('./products/product-start/product-start.component').then(
        (p) => p.ProductStartComponent
      ),
  },
  {
    path: 'admin/products/add-new',
    loadComponent: () =>
      import('./products/add-product/add-product.component').then(
        (p) => p.AddProductComponent
      ),
  },
  {
    path: 'admin/products/:id',
    loadComponent: () =>
      import('./products/edit-product/edit-product.component').then(
        (m) => m.EditProductComponent
      ),
  },
];
