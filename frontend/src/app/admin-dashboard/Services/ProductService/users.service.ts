import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL } from 'src/app/constants';
import { HttpErrorPopupService } from 'src/app/shared/http-error-popup/http-error-popup.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { User } from '../../Interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users: User[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService,
    private httpErrorPopupService: HttpErrorPopupService,
    private authService: AuthService
  ) {}

  token = this.localStorage.getToken() as string;

  getUsers(): Observable<User[]> {
    // return this.products API_URL
    // return this.http.get<User[]>('https://angul-a3143-default-rtdb.firebaseio.com/Users.json')
    return this.http
      .get<User[]>(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
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

  // deleteUser(id: string) {
  //   this.http
  //     .delete(
  //       `https://angul-a3143-default-rtdb.firebaseio.com/Users/${id}.json`
  //     )
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }

  deleteUser(id: string) {
    console.log("--------------------")
    console.log(id)
    this.http
      .delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
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
