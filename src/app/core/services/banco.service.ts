import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Banco } from '../models/banco.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/banco`;

  findAll(): Observable<Banco[]> {
    return this.http.get<Banco[]>(this.apiUrl);
  }

  findById(id: number): Observable<Banco> {
    return this.http.get<Banco>(`${this.apiUrl}/${id}`);
  }

  create(banco: Partial<Banco>): Observable<any> {
    return this.http.post(this.apiUrl, banco);
  }

  update(id: number, banco: Partial<Banco>): Observable<Banco> {
    return this.http.put<Banco>(`${this.apiUrl}/${id}`, banco);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
