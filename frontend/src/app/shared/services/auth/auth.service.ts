import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login, User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn = false;
  private tokenKey = 'token';

  setLoginTrue() {
    this.isLoggedIn = true;
  }

  // public handleError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //       // this.errorMessage=error.error
  //       // console.log(this.errorMessage)
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }

  userUrl: string = 'http://localhost:5500/api/users/signup';
  loginUrl: string = 'http://localhost:5500/api/users/signin';

  public postUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user);

    // .pipe(
    //   catchError(this.handleError)

    // );
  }

  public loginUser(userlogin: Login): Observable<Login> {
    // return this.http.post<Login>(this.loginUrl, userlogin);
    return this.http.post<Login>(this.loginUrl, userlogin).pipe(
      catchError((error) => {
        this.errorMessage = error.error;
        console.log(error);
        return throwError(error);
      })
    );
  }

  getAuthStatus(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 10);
    });
    return promise;
  }

  // register
  public register(user: User) {
    this.postUser(user).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token.email);
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
