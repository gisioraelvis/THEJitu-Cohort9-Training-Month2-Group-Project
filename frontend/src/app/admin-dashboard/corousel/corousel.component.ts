import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-corousel',
  standalone: true,
  imports: [CommonModule,RouterModule],
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

