import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserProfile } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baserUrl: string = 'http://localhost:5500/api';
  constructor(private http: HttpClient, private router: Router) {}

  getUserProfile(): Observable<IUserProfile> {
    return this.http
      .get<IUserProfile>(`${this.baserUrl}/api/user/profile`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(err);
        })
      );
  }
}
