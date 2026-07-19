import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "https://velora-backend-08fd.onrender.com/register/";

  constructor(private http: HttpClient) { }

  register(data:any):Observable<any>{

    return this.http.post(this.apiUrl,data);

  }

  login(data: any): Observable<any> {

  return this.http.post(
    'https://velora-backend-08fd.onrender.com/login/',
    data
  );

}

// logout() {

//   localStorage.removeItem('token');

// }

logout() {

  localStorage.removeItem('token');
  localStorage.removeItem('is_staff');
  localStorage.removeItem('username');
  localStorage.removeItem('first_name');

}

isLoggedIn(): boolean {

  return !!localStorage.getItem('token');

}

}