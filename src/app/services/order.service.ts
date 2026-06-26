import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://127.0.0.1:8000/place-order/';

  constructor(private http: HttpClient) {}

  placeOrder(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(
      'http://127.0.0.1:8000/orders/'
    );
  }

}