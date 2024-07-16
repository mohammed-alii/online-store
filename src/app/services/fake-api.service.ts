import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<product[]> {
    return this.http.get<product[]>('https://fakestoreapi.com/products');
  }
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }
  getCategoryProducts(category: string): Observable<product[]> {
    return this.http.get<product[]>(
      `https://fakestoreapi.com/products/category/${category}`
    );
  }
  getProduct(productId: any): Observable<product> {
    return this.http.get<product>(`https://fakestoreapi.com/products//${productId}`);
  }
}
