import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './Services/Guards/auth-guard.service';
import { CanDeactiveService } from './Services/Guards/can-deactive.service';
import { ProductResolverService } from './Services/Guards/product-resolver.service';



const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(h => h.HomeComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(l => l.LoginComponent) }
  ,
  {
    path: 'products', loadComponent: () => import('./products/products.component').then(p => p.ProductsComponent)
    , canActivateChild: [AuthGuardService], children: [
      { path: '', loadComponent: () => import('./products/product-start/product-start.component').then(p => p.ProductStartComponent) },
      { path: 'add/new', loadComponent: () => import('./products/add-product/add-product.component').then(p => p.AddProductComponent) },
      {
        path: ':id', resolve: { product: ProductResolverService },
        loadComponent: () => import('./products/product/product.component').then(p => p.ProductComponent)
      },
      {
        path: ':id/edit', canDeactivate: [CanDeactiveService],
        loadComponent: () => import('./products/edit-product/edit-product.component').then(m => m.EditProductComponent)
      },
      {
        path: 'category/all',
        loadComponent: () => import('./products/category/category.component').then(c => c.CategoryComponent)
      }
    ]
  },
  {
    path: 'not-found',
    loadComponent: () => import('./page-not-found/page-not-found.component').then(p => p.PageNotFoundComponent)
    , data: { message: 'Error Occured' }
  },
  { path: "**", redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
