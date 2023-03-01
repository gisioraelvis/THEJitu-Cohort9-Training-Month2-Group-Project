import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  standalone: true,
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule,
    LoadingSpinnerComponent,
  ],
})
export class CarouselComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products.slice(0, 5);
    });
  }
}
