import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  students=[{
    name:'Jesse',
    reg_no: 'cnjke2020',
    balance:200
    // alert("Entered Email id : " + data.emailid);
  }]
  onClickSubmit(data:any) {
     let fname = data.name
     let reg_no = data.reg_no
     let balance = data.balance
    this.students.push({  name: fname, reg_no: reg_no, balance: balance})
    console.log(this.students);
    
  }
  
}
