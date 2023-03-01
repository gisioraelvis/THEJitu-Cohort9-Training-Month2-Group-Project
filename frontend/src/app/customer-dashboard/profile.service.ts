import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IUser } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // profile$=new Subject<Booking[]>()

  constructor(private http:HttpClient) { }


  getUserById():Observable<IUser[]>{
   return  this.http.get<IUser[]>('http://localhost:5500/api/orders/getorders')
  }
  // updateProfile(id: string, updateProfile): Observable<Message> {
  //   return this.http.put<Message>(`http://localhost:4000/api/users/profile`, updatedProfile)
  // }
}
