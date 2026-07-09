import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://127.0.0.1:8000/cart-items/';

  // ==========================
  // Cart Badge Count
  // ==========================

  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  constructor(private http: HttpClient) {}

  // ==========================
  // Get Cart Items
  // ==========================

  getCartItems(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }

  // ==========================
  // Add To Cart
  // ==========================

  addToCart(data: any): Observable<any> {

    return this.http.post(this.apiUrl, data);

  }

  // ==========================
  // Update Cart Item
  // ==========================

  updateCartItem(id: number, data: any) {

    return this.http.put(

      `http://127.0.0.1:8000/cart-items/${id}/`,

      data

    );

  }

  // ==========================
  // Delete Cart Item
  // ==========================

  deleteCartItem(id: number) {

    return this.http.delete(

      `http://127.0.0.1:8000/cart-items/${id}/`

    );

  }

  // ==========================
  // Load Cart Count
  // ==========================

  loadCartCount() {

    this.getCartItems().subscribe({

      next: (items: any[]) => {

        let count = 0;

        items.forEach(item => {

          count += item.quantity;

        });

        this.cartCount.next(count);

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}