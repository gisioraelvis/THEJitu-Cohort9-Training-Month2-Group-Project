import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, ProductCardComponent, FooterComponent],
  imports: [CommonModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
