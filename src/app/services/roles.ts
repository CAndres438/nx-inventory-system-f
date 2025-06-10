import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from './token';
import { Role } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = `${environment.apiUrl}/api/roles`;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/active`);
  }


  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  createRole(data: any): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, data, { headers: this.getHeaders() });
  }

  updateRole(id: number, data: any): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  toggleRole(id: number, active: boolean): Observable<void> {
  return this.http.put<void>(
    `${this.baseUrl}/${id}/status`,
    { active },
    { headers: this.getHeaders() }
  );
}

}
