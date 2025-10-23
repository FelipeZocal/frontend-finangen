import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContaBancaria } from '../models/conta-bancaria.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/contabancaria`;

  findAll(): Observable<ContaBancaria[]> {
    return this.http.get<ContaBancaria[]>(this.apiUrl);
  }

  create(conta: Partial<ContaBancaria>): Observable<any> {
    return this.http.post(this.apiUrl, conta);
  }

  update(id: number, conta: Partial<ContaBancaria>): Observable<ContaBancaria> {
    return this.http.put<ContaBancaria>(`${this.apiUrl}/${id}`, conta);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
