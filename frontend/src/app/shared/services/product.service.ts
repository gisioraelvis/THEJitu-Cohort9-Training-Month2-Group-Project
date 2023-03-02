import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpErrorPopupService } from '../http-error-popup/http-error-popup.service';
import { API_URL } from 'src/app/constants';
import { IProduct, IProductObject } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${API_URL}/products`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(error);
      })
    );
  }

  getProduct(id: number): Observable<IProductObject> {
    return this.http.get<IProductObject>(`${API_URL}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(error);
      })
    );
  }
}
