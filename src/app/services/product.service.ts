import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://127.0.0.1:8000/products/';

  constructor(private http: HttpClient) { }

  // Get All Products
  getProducts(
    search: string = '',
    category: string = '',
    price: string = '',
    sort: string = ''
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}?search=${search}&category=${category}&price=${price}&sort=${sort}`
    );

  }

  // Get Single Product
  getProduct(id: number): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}${id}/`
    );

  }

  // Add Product
  addProduct(data: FormData): Observable<any> {

    return this.http.post(
      this.apiUrl,
      data
    );

  }

  // Update Product
  updateProduct(id: number, data: FormData): Observable<any> {

    return this.http.put(
      `${this.apiUrl}${id}/`,
      data
    );

  }

  // Delete Product
  deleteProduct(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}${id}/`
    );

  }

}