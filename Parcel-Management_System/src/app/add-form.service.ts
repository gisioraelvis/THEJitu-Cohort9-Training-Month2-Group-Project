import { Injectable } from '@angular/core';
import { Parcel } from 'src/interface';

@Injectable({
  providedIn: 'root'
})
export class AddFormService {

  private parcels: Parcel[] = [
    {
      name: "Jesse Mucheke",
      email:"mucheke@gmail.com",
      destination:"Lodwar",
      description:'Lorem ipsum d unde magni eveniet illum esse, quasi perferendis eum.'    },
    {
      name: "Jesse Mucheke",
      email: "mucheke@gmail.com",
      destination: "Lodwar",
      description:'Lorem ipsum d unde magni eveniet illum esse, quasi perferendis eum.'
    },
    {
      name: "Jesse Mucheke",
      email:"mucheke@gmail.com",
      destination:"Lodwar",
      description:'Lorem ipsum d unde magni eveniet illum esse, quasi perferendis eum.'    },
    {
      name: "Jesse Mucheke",
      email: "mucheke@gmail.com",
      destination: "Lodwar",
      description:'Lorem ipsum d unde magni eveniet illum esse, quasi perferendis eum.'
    },
    {
      name: "Jesse Mucheke",
      email: "mucheke@gmail.com",
      destination: "Lodwar",
      description:'Lorem ipsum d unde magni eveniet illum esse, quasi perferendis eum.'
    },
    {
      name: "Jesse Mucheke",
      email: "mucheke@gmail.com",
      destination: "Lodwar",
      description:'Lorem ipsum d unde magni eveniet illum esse, quasi perferendis eum.'
    }
  ]

  public registration = ''
  constructor() { }

  getParcels() {
    return this.parcels
  }
  addParcel(parcel: Parcel) {
    this.parcels.push(parcel)
  }
}
