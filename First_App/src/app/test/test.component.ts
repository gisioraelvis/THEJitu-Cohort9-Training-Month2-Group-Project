import { Component } from "@angular/core";


@Component({
 selector:"app-test",
 templateUrl:"./test.component.html",
 styleUrls:['./test.component.css']
 
})
export class Test{
 image = '../../favicon.ico'
 shwquiz=true
 showQuestion(){
  this.shwquiz= !this.shwquiz
 }

 shwans = true;
  
  showAnswer() {
    this.shwans = !this.shwans;
  }

}