import { Component } from '@angular/core';

@Component({
  selector: 'app-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.css']
})
export class CorouselComponent {
  months:string[]= ['Jan','Feb','Mar','Apr','May','Jun'];
 
  date = new Date();
  month=this.months[this.date.getMonth()];
  day= this.date.getDate();
  year= this.date.getFullYear();
}
