import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { ProfileService } from '../profile.service';
import { User } from '../interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    EditProfileComponent,
    MyOrdersComponent,
  ],
})
export class CustomerComponent implements OnInit {
  user?: User;
  constructor(
    private modalService: ModalService,
    public profileService: ProfileService,
    public authService: AuthService
  ) {}

  open() {
    this.modalService.open();
  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe((user) => {
      this.user = user;
    });
  }
}
