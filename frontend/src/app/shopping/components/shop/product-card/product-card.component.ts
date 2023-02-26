import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [RouterModule],
})
export class ProductCardComponent {
  @Input() product?: IProduct;
}
