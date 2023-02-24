import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Parcel } from 'src/interface';
import { AddFormService } from '../add-form.service';

@Component({
  selector: 'app-display-parcel',
  templateUrl: './display-parcel.component.html',
  styleUrls: ['./display-parcel.component.css']
})
export class DisplayParcelComponent {
  @Output() sentData = new EventEmitter<{ reg: string }>()

  parcels: Parcel[] = []

  constructor(private addFormService: AddFormService) {
    this.parcels = this.addFormService.getParcels()
  }


}
