import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://127.0.0.1:8000/reviews/';

  constructor(private http: HttpClient) { }

  // Get Reviews for a Product
  getReviews(productId: number): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}?product=${productId}`
    );

  }

  // Add Review
  addReview(data: any): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      data
    );

  }

  // Delete Review
  deleteReview(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}${id}/`
    );

  }

}