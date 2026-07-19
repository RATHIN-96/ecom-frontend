import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = 'https://velora-backend-08fd.onrender.com/admin-dashboard/';

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(this.api);
  }

}