import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Parcel-Management_System';
  reg = ''
  Update(event: { reg: string }) {
    // console.log(event.reg);
    this.reg = event.reg
  }
}
