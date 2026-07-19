import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private apiUrl = 'https://velora-backend-08fd.onrender.com/wishlist/';

  constructor(private http: HttpClient) { }

  getWishlist(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addToWishlist(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  removeWishlist(id: number): Observable<any> {
    return this.http.delete(
      `https://velora-backend-08fd.onrender.com/wishlist/${id}/`
    );
  }

}