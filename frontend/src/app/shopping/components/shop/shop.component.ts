import { Component } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [NavbarComponent],
})
export class ShopComponent {}
