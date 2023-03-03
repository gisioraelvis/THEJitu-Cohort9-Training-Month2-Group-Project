import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule],
})
export class HomeComponent  {

  constructor(
    public authService: AuthService,
   
  ) {}
  logout() {
    this.authService.logout();
  }
}
