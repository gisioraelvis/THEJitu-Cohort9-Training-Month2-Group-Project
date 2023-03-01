import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule} from '@angular/router';
import { map } from 'rxjs';
import { User } from '../../Interfaces';
import { UserService } from '../../Services/ProductService/users.service';
@Component({
  selector: 'app-softdelete',
 
  templateUrl: './softdelete.component.html',
  styleUrls: ['./softdelete.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule]
})
export class SoftdeleteComponent implements OnInit {


  users:User[]=[]
  constructor(private userService:UserService, private route:ActivatedRoute){}
  
  ngOnInit(): void {
  this.route.queryParams.subscribe((params:Params)=>{
    this. userService.getUsers().pipe(map(x=>{
      let usersArray=[]
      for(let key in x){
        usersArray.push({...x[key], id:key})
      }
      return usersArray
    })).subscribe(user=>{
      this.users=user
    })


  })
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id);
    // remove the deleted product from the local products array
    this.users = this.users.filter(user => user.id !== id);
  }
}


