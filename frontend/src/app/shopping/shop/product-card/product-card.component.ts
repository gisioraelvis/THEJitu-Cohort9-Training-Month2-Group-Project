import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CartService } from '../../cart/cart.service';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [CommonModule, RouterModule],
})
export class ProductCardComponent {
  @Input() product?: IProduct;
  constructor(
    private router: Router,
    private cartService: CartService,
    public authService: AuthService
  ) {}

  addToCart(): void {
    this.cartService.addToCart(this.product!.id, 1).subscribe();
    this.router.navigate(['/cart']);
  }
}
