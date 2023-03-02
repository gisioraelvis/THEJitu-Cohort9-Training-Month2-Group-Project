import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserProfile } from '../interfaces/user';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { API_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  token = this.localStorage.getToken() as string;

  getUserProfile(): Observable<IUserProfile> {
    return this.http
      .get<IUserProfile>(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
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
