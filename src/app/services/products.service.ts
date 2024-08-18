import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams } from '../../types/pagination-params';
import { Products } from '../../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProducts(url: string, params: PaginationParams): Observable<Products> {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }

  addProduct(url: string, body: any): Observable<Products> {
    return this.apiService.post(url, body, {});
  }

  editProduct(url: string, body: any): Observable<Products> {
    return this.apiService.put(url, body, {});
  }

  deleteProduct(url: string): Observable<Products> {
    return this.apiService.delete(url, {});
  }
}
