import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://127.0.0.1:8000/cart-items/';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addToCart(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  

//   deleteCartItem(id: number) {
//   return this.http.delete(`http://127.0.0.1:8000/cart-items/${id}/`);
// }

updateCartItem(id: number, data: any) {
  return this.http.put(
    `http://127.0.0.1:8000/cart-items/${id}/`,
    data
  );
}

deleteCartItem(id: number) {
  return this.http.delete(
    `http://127.0.0.1:8000/cart-items/${id}/`
  );
}
  

}
