import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  
  // Hiding the form contents using ngIf
  shwform = true
  addTodo() {
    this.shwform = !this.shwform
  }
  editTodo(){
    this.shwform = !this.shwform
  }

  // Creating an array to store the todos
  Todos =[{
    id:234,
    title:"eat",
    description:"some fancy food",
    date:"20/01/2023",
    Completed: false
  }]

  onClickSubmit(todos:any){
    this.shwform = !this.shwform
    let title = todos.title
    let description = todos.description
    let date = todos.date
    this.Todos.push({ title, description, date, Completed: false, id: Math.floor(Math.random() * 1000) })
    console.log(this.Todos);
  }

  updateTask(id:number){
    const index = this.Todos.findIndex(todo => todo.id === id)
    let todo = this.Todos[index]

    // title.value = this.Todos.Title
    // description.value = this.Todos.Description
    // date.value = this.Todos.Date
    // updating = index

  }
  complete(id:number){

  }
  deleteTask(id: number){
    const index = this.Todos.findIndex(todo => todo.id === id)
    this.Todos.splice(index, 1)
  }



}