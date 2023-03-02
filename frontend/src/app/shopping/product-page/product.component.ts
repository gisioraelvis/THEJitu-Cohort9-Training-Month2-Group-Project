import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
=======
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
>>>>>>> 2af464c8b5a0035b9e9c8770da1a9206cbb2d171
import { IProductObject } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormsModule } from '@angular/forms';
import { GoBackComponent } from 'src/app/shared/go-back/go-back.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
<<<<<<< HEAD
=======
import { CartService } from '../cart/cart.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
>>>>>>> 2af464c8b5a0035b9e9c8770da1a9206cbb2d171

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
<<<<<<< HEAD
=======
    RouterModule,
>>>>>>> 2af464c8b5a0035b9e9c8770da1a9206cbb2d171
  ],
})
export class ProductComponent implements OnInit {
  product?: IProductObject | undefined;
  qty: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
<<<<<<< HEAD
    private router: Router
=======
    private router: Router,
    private cartService: CartService,
    public authService: AuthService
>>>>>>> 2af464c8b5a0035b9e9c8770da1a9206cbb2d171
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
<<<<<<< HEAD
=======
    this.cartService.addToCart(this.product!.id, this.qty).subscribe();
>>>>>>> 2af464c8b5a0035b9e9c8770da1a9206cbb2d171
    this.router.navigate(['/cart']);
  }
}
