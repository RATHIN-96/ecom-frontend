import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = 'http://127.0.0.1:8000/admin-dashboard/';

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(this.api);
  }

}