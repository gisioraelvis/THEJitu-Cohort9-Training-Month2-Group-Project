import { Component, } from '@angular/core';
import { UserService } from '../../services/user-services.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[] = [];
  
  constructor(private UserService: UserService) { }
  
  ngOnInit(): void {
    this.UserService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}




// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../services/user-services.service';
// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.css']
// })
// export class UsersComponent implements OnInit {
//   users: any[] = [];
  
//   constructor(private userService: UserService) { }
  
//   ngOnInit(): void {
//     this.userService.getUsers().subscribe(data => {
//       this.users = data;
//     });
//   }
// }

