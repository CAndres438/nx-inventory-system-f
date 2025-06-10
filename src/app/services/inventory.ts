import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventory } from '../models/inventory';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TokenService } from './token';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = `${environment.apiUrl}/api/inventory`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  filterInventory(filters: any): Observable<Inventory[]> {
    return this.http.post<Inventory[]>(`${this.baseUrl}/filter`, filters, {
      headers: this.getHeaders()
    });
  }

  createInventory(data: any): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.baseUrl}`, data, {
      headers: this.getHeaders()
    });
  }

  updateInventory(id: number, data: any): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.baseUrl}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
