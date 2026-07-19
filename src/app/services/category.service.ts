import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://velora-backend-08fd.onrender.com/categories/';

  constructor(private http: HttpClient) {}

  // Get All Categories
  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add Category
  addCategory(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Update Category
  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  // Delete Category
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

}