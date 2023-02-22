import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PageNotFoundComponent implements OnInit {
  constructor(private route:ActivatedRoute){}
  message!:string
ngOnInit(): void {
 this.route.data.subscribe((data:Data)=>{
  this.message=data['message']
 }) 
}
}
