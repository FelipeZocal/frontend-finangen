import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Lancamento } from '../models/lancamento.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/lancamento`;

  findAll(): Observable<Lancamento[]> {
    return this.http.get<Lancamento[]>(this.apiUrl);
  }

  create(lancamento: Partial<Lancamento>): Observable<any> {
    return this.http.post(this.apiUrl, lancamento);
  }

  update(id: number, lancamento: Partial<Lancamento>): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${this.apiUrl}/${id}`, lancamento);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
