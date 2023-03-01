import { ProfileService } from './../profile.service';
import { RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CustomerComponent],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  form!: FormGroup
  constructor(private fb: FormBuilder, public profileService: ProfileService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmpass: [null, [Validators.required]]
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.route.params.subscribe((param: Params) => {
    //   this.profileService.getUserById(param['id']).subscribe(res => {
    //     this.id = param['id']
    //     let date = new Date(res.TravelDate).toISOString().slice(0, 10)
    //     this.form.setValue({
    //       Destination: res.Destination,
    //       TravelDate: date
    //     })

    //   })
    // })

  }
  submitData() {

    // this.profileService.updateProfile(this.id, this.form.value).subscribe()
  }

}
