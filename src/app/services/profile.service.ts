import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://127.0.0.1:8000/profile/';

  constructor(private http: HttpClient) { }

  // Get Logged-in User Profile
  getProfile(): Observable<any> {

    return this.http.get<any>(this.apiUrl);

  }

  // Update Profile
  updateProfile(data: any): Observable<any> {

    return this.http.put<any>(
      this.apiUrl,
      data
    );

  }

  changePassword(data: any): Observable<any> {

  return this.http.post<any>(
    'http://127.0.0.1:8000/change-password/',
    data
  );

}

}