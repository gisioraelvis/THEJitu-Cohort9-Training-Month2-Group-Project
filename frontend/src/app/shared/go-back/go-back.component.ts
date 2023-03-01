import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css'],
})
export class GoBackComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
