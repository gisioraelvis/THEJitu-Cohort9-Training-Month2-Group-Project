import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  text="I a learning binding in Angular"
  allow=true

  constructor(){
    setTimeout(()=>{
      this.allow=false
    },3000)

    
  }
  Change(e:Event){
      this.text=(e.target as HTMLInputElement).value
    }
  changeText(){
    this.text="Hello how are you doing?"
  }

}
