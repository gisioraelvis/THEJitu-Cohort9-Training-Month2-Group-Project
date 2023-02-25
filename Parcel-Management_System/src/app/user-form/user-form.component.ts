import { Parcel } from 'src/interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddFormService } from '../add-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form!: FormGroup
  show = false;
  @Input() reg!: string
  parcel!: Parcel


  constructor(private fb: FormBuilder, private addFormService: AddFormService) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern("@travel.com")]],
      destination: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
    console.log(this.reg);
  }

  submitData() {

      let parcel: Parcel = { ...this.form.value }
      this.addFormService.addParcel(parcel)
    }

}
