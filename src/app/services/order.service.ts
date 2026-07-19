import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private placeOrderUrl = 'https://velora-backend-08fd.onrender.com/place-order/';
  private orderUrl = 'https://velora-backend-08fd.onrender.com/orders/';

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

      `https://velora-backend-08fd.onrender.com/cancel-order/${id}/`,

      {}

    );

  }

  downloadInvoice(id: number) {

    return this.http.get(

      `https://velora-backend-08fd.onrender.com/invoice/${id}/`,

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

    'https://velora-backend-08fd.onrender.com/buy-now-order/',

    data

  );

}

}