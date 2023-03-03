import { Route } from '@angular/router';
import { OrdersResolverService } from './Services/Guards/order-resolver.service';
import { CanDeactiveService } from './Services/Guards/can-deactive.service';
export const ADMIN_ROUTES: Route[] = [
    {path: 'home',    loadComponent:() => import('./home/home.component').then(f => f.HomeComponent), children: [
  {
    path: '',
    loadComponent: () =>
      import('./corousel/corousel.component').then((p) => p.CorouselComponent),
    pathMatch: 'full',
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.component').then((p) => p.OrdersComponent),
  },
  {
    path: 'orders/:id',
    resolve: { Order: OrdersResolverService },
    loadComponent: () =>
      import('./orders/edit-oders/edit-orders.component').then(
        (p) => p.OrderEditComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/users.component').then((p) => p.UsersComponent),
  },
  {
    path: 'users/soft-deleted',
    loadComponent: () =>
      import('./users/softdelete/softdelete.component').then(
        (p) => p.SoftdeleteComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/product-start/product-start.component').then(
        (p) => p.ProductStartComponent
      ),
  },
  {
    path: 'products/add-new',
    loadComponent: () =>
      import('./products/add-product/add-product.component').then(
        (p) => p.AddProductComponent
      ),
  },
  {
    path: 'products/:id', 
    loadComponent: () =>
      import('./products/edit-product/edit-product.component').then(
        (m) => m.EditProductComponent
      ),
  },
]}];
