import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Order, Product } from '../../Interfaces';
import { OrdersService} from '../ProductService/orders.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService implements Resolve<Order> {
    constructor( private ordersService:OrdersService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Order | Observable<Order> | Promise<Order> {
   return this.ordersService.getOneOrder(route.params['id'])
  }
}
