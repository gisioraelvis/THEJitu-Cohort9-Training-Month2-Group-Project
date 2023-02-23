import { Component } from '@angular/core';

@Component({
  selector: 'app-templatevar',
  templateUrl: './templatevar.component.html',
  styleUrls: ['./templatevar.component.css']
})
export class TemplatevarComponent {
  myname =''
  shwname=true

  day=new Date().getDay();


  onSubmit(name:HTMLInputElement){
    this.shwname=!this.shwname
    this.myname=name.value
  }

  data:{name:string,role:string}[]=[]

  addPerson(miname:HTMLInputElement,role:HTMLSelectElement){
    this.data.push({name:miname.value,role:role.value})
  }

  delete(i:number){
    this.data.splice(i,1)
  }
  


}
