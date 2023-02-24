import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { state, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('myTrigger',[
      state('small',style(
        {opacity:'1', transform:'scale(1)'})),

      state('large', style(
        { opacity: '1', transform: 'scale(1.2)' }))
    ])
  ]
})
export class HomeComponent {
}
