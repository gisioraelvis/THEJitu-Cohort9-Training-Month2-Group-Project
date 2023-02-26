import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IProductObject } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent],
})
export class ProductComponent implements OnInit {
  product?: IProductObject | undefined;
  qty: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
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

  goBack(): void {
    this.location.back();
  }

  addToCart(): void {
    console.log('Added to cart');
  }
}
