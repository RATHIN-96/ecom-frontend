import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://127.0.0.1:8000/create-payment/';

  constructor(private http: HttpClient) {}

  createPayment(data: any): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      data
    );

  }

  verifyPayment(data: any): Observable<any> {

  return this.http.post<any>(
    'http://127.0.0.1:8000/verify-payment/',
    data
  );

}

buyNowCreatePayment(data: any) {

  return this.http.post(

    'http://127.0.0.1:8000/buy-now-create-payment/',

    data

  );

}

buyNowVerifyPayment(data: any) {

  return this.http.post(

    'http://127.0.0.1:8000/buy-now-verify-payment/',

    data

  );

}

}