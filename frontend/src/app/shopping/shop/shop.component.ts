import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { ProductService } from 'src/app/shared/services/product.service';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    CarouselComponent,
    ProductCardComponent,
    LoadingSpinnerComponent,
  ],
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
