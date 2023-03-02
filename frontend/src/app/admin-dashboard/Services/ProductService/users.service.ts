import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public users:User[]=[]

  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    // return this.products
    return this.http.get<User[]>('https://angul-a3143-default-rtdb.firebaseio.com/Users.json')
  }



  deleteUser(id:string){
    this.http.delete(`https://angul-a3143-default-rtdb.firebaseio.com/Users/${id}.json`).subscribe(response=>{
      console.log(response);
    })
  }
  
}
