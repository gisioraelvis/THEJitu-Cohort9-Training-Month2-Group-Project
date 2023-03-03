import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../../Interfaces';
import { API_URL } from 'src/app/constants';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { HttpErrorPopupService } from 'src/app/shared/http-error-popup/http-error-popup.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  public products:Product[]=[]

  constructor(private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService,
    private httpErrorPopupService: HttpErrorPopupService,
    private authService: AuthService) { }

    token = this.localStorage.getToken() as string;

  addProduct(product:Product):void{
    // this.products.push(product)
      this.http.post('https://angul-a3143-default-rtdb.firebaseio.com/Products.json',product)
      .subscribe(response=>{
        console.log(response);
      })
      }

  getProducts():Observable<Product[]>{
    // return this.products
    return this.http.get<Product[]>(`${API_URL}/products`,{
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

  getOneProduct(id:string):Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`,
    {
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

  // getProductCategories():string[]{
  //   let category:string[]=[];

  //   for(let c of this.products){
  //     let x = category.find(p=>p===c.category)
  //     if(!x){
  //       category.push(c.category)
  //     }
  //   }
  //   return category;
  // }

  // getProductinaCategory(categoryName:string):Product[]{
  //   let x = this.products.filter(x=>x.category===categoryName)
  //   return x
  // }

  updateProduct(id:string, product:Product){
    // let index= this.products.findIndex(x=>x.id===id)
    // this.products[index]=product
    this.http.put(`${API_URL}/products/${id}`,{
      headers: { Authorization: `Bearer ${this.token}` },
    }).subscribe(response=>{
      console.log(response);
      
    })
    
  }
  // deleteProduct(id:string){
  //   this.http.delete(`https://angul-a3143-default-rtdb.firebaseio.com/Products/${id}.json`).subscribe(response=>{
  //     console.log(response);
      
  //   })
  // }

  deleteProduct(id:string){
    this.http.delete(`https://angul-a3143-default-rtdb.firebaseio.com/Products/${id}.json`).subscribe(response=>{
      console.log(response);
    })
  }
  
}
