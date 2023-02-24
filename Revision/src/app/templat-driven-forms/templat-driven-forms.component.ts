import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-templat-driven-forms',
  templateUrl: './templat-driven-forms.component.html',
  styleUrls: ['./templat-driven-forms.component.css']
})
export class TemplatDrivenFormsComponent {
  default='default'
  @ViewChild('addDetails')addDetails!:NgForm

  submitForm(){
    console.log(this.addDetails.value);
    this.addDetails.reset()

  }
  prePopulate(){
    this.addDetails.setValue({
      position: 'Staff',
      personalDetails:{
      username: 'Jesse',
      email: 'ychag@example.com',
      phone:'2394012043',
      password: 'Jae@3943049fj',
      }

    })
    // this.addDetails.form.patchValue({
    //   position: 'Staff',
    //   // personalDetails: {
    // //   username: 'Jesse',
    // //   email: 'ychag@example.com',
    // //   phone:'2394012043',
    // //   password: 'jae@3943049fj',
    // //   }
      
    // })
  }

}
