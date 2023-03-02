import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // profile$=new Subject<Booking[]>()

  constructor(private http:HttpClient) { }


  getUserProfile():Observable<User>{
    
    const accessToken = localStorage.getItem('token') || " ";
    return this.http.get<User>('http://localhost:5500/api/users/profile', {
     headers: new HttpHeaders().set("Authorization", 'Bearer ' + accessToken)})
  }

  updateProfile(user:User){
    const accessToken = localStorage.getItem('token') || " ";
    
    return this.http.put(`http://localhost:5500/api/users/profile`, user,{
     headers: new HttpHeaders().set("Authorization", 'Bearer ' + accessToken)}).subscribe(response=>{console.log(response)})

  }


  
}
