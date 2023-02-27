import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://console.firebase.google.com/project/angul-a3143/database/angul-a3143-default-rtdb/data/~2F/Users.json'; // Replace this with the actual API endpoint URL
  
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
