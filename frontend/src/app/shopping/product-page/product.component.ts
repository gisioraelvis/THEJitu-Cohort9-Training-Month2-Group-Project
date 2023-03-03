import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProductObject } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormsModule } from '@angular/forms';
import { GoBackComponent } from 'src/app/shared/go-back/go-back.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { CartService } from '../cart/cart.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    GoBackComponent,
    LoadingSpinnerComponent,
    RouterModule,
  ],
})
export class ProductComponent implements OnInit {
  product?: IProductObject | undefined;
  qty: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe((product) => {
      this.product = product;
    });
  }

  addToCart(): void {
    this.cartService.addToCart(this.product!.id, this.qty).subscribe();
    this.router.navigate(['/cart']);
  }
}
