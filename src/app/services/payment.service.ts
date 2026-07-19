import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://velora-backend-08fd.onrender.com/create-payment/';

  constructor(private http: HttpClient) {}

  createPayment(data: any): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      data
    );

  }

  verifyPayment(data: any): Observable<any> {

  return this.http.post<any>(
    'https://velora-backend-08fd.onrender.com/verify-payment/',
    data
  );

}

buyNowCreatePayment(data: any) {

  return this.http.post(

    'https://velora-backend-08fd.onrender.com/buy-now-create-payment/',

    data

  );

}

buyNowVerifyPayment(data: any) {

  return this.http.post(

    'https://velora-backend-08fd.onrender.com/buy-now-verify-payment/',

    data

  );

}

}