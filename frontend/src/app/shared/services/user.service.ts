import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserProfile } from '../interfaces/user';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { API_URL } from 'src/app/constants';
import { HttpErrorPopupService } from '../http-error-popup/http-error-popup.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}

  token = this.localStorage.getToken() as string;

  getUserProfile(): Observable<IUserProfile> {
    return this.http
      .get<IUserProfile>(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          this.httpErrorPopupService.showError(
            error.status,
            error.error.message
          );
          return throwError(error);
        })
      );
  }
}
