import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductCardComponent } from './product/product.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [
    CommonModule,
    NavbarComponent,
    CarouselComponent,
    ProductCardComponent,
  ],
})
export class ShopComponent {
  products = [1, 2, 3, 4, 5, 6];
}
