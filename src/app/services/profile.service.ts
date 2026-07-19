import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'https://velora-backend-08fd.onrender.com/profile/';

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
    'https://velora-backend-08fd.onrender.com/change-password/',
    data
  );

}

}