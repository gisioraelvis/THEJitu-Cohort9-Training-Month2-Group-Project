import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { ProductPageComponent } from './components/product-page/product-page.component';



@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    ProductPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShopModule { }
