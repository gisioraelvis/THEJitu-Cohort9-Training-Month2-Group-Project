import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  default='default'
  genders=["Male","Female"]

  form!:FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      username:new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null),
      password: new FormControl(null),
      position: new FormControl(null),
    })

  }
  submitData() {
    console.log(this.form);

  }

}
