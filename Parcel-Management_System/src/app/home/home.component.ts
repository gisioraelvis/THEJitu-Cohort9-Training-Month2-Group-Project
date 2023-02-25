import { Component, EventEmitter, Output } from '@angular/core';
import { Parcel } from 'src/interface';
import { AddFormService } from '../add-form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Output() sentData = new EventEmitter<{ reg: string }>()

  parcels: Parcel[] = []

  constructor(private addFormService: AddFormService) {
    this.parcels = this.addFormService.getParcels()
  }

}
