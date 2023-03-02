import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  constructor(
    private modalService: ModalService
  ) { }

  open() {
    this.modalService.open();
  }

}
