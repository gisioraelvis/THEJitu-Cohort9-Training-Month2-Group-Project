import { Component } from '@angular/core';
import { AuthService } from './Services/AuthService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product';

  constructor(public authService:AuthService){}
}
