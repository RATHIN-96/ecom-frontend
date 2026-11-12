import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:8000/users/';

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }

  // Block / Unblock User
  toggleUserStatus(id: number): Observable<any> {

    return this.http.patch(
      `${this.apiUrl}${id}/toggle-status/`,
      {}
    );

  }

}