import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { RegisterComponent } from 'src/app/core/components/register/register.component';
import { AuthService } from '../auth/auth.service';
// import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private router:Router, private authService:AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getAuthStatus().then((status:boolean)=>{
        if(status){
          return true
        }else{
          alert("please login to continue")
          this.router.navigate(['login'])
          return false
        }
       })
  }
  // isLoggedIn = false
  // private tokenKey = 'token';
  
  
  //  getAuthStatus():Promise<boolean>{
  //   const promise = new Promise<boolean>((resolve,reject)=>{
  //   setTimeout(()=>{
  //     resolve(this.isLoggedIn)
  //   },10)
  //   })
  //   return promise;
  // }

  // // register
  // public register(user:User){

  //   this.authService.postUser(user)
  //   .subscribe((token) => {
  //     localStorage.setItem(this.tokenKey, token.email);
  //     this.isLoggedIn=true
  //     this.router.navigate(['/']);
  //   });

  // }

  // logout(){
  //   localStorage.removeItem(this.tokenKey);
  //   this.isLoggedIn=false;
  //   this.router.navigate(['/login'])
  // }
}
