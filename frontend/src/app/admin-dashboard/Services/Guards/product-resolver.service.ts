import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../Interfaces';
import { ProductService } from '../ProductService/product.service';


@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {
    constructor( private productService:ProductService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Product | Observable<Product> | Promise<Product> {
   return this.productService.getOneProduct(route.params['id'])
  }
}
