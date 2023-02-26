import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CarouselComponent } from './components/shop/carousel/carousel.component';
import { HomeComponent } from './components/shop/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, CarouselComponent, ProductPageComponent],
  imports: [CommonModule, SharedModule],
})
export class ShoppingModule {}
