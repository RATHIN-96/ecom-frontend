import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private placeOrderUrl = 'http://127.0.0.1:8000/place-order/';
  private orderUrl = 'http://127.0.0.1:8000/orders/';

  constructor(private http: HttpClient) {}

  // ===============================
  // User
  // ===============================

  placeOrder(data: any): Observable<any> {

    return this.http.post<any>(
      this.placeOrderUrl,
      data
    );

  }

  getOrders(): Observable<any[]> {

    return this.http.get<any[]>(
      this.orderUrl
    );

  }

  cancelOrder(id: number) {

    return this.http.post(

      `http://127.0.0.1:8000/cancel-order/${id}/`,

      {}

    );

  }

  downloadInvoice(id: number) {

    return this.http.get(

      `http://127.0.0.1:8000/invoice/${id}/`,

      {

        responseType: 'blob'

      }

    );

  }

  // ===============================
  // Admin
  // ===============================

  getOrder(id: number): Observable<any> {

    return this.http.get<any>(
      `${this.orderUrl}${id}/`
    );

  }

  updateOrder(id: number,data: any):
   Observable<any> {

    return this.http.patch<any>(
      `${this.orderUrl}${id}/`,
      data
    );

  }

buyNow(data: any) {

  return this.http.post(

    'http://127.0.0.1:8000/buy-now-order/',

    data

  );

}

}