import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ParseDatePipe } from '../../../shared/pipes/parse-date.pipe';

import { Lancamento } from '../../../core/models/lancamento.model';
import { Categoria } from '../../../core/models/categoria.model';
import { LancamentoService } from '../../../core/services/lancamento.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { LancamentoFormComponent } from '../lancamento-form/lancamento-form.component';

@Component({
  selector: 'app-lancamento-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CurrencyPipe,
    ParseDatePipe,
    DatePipe
  ],
  templateUrl: './lancamento-list.component.html',
  styleUrls: ['./lancamento-list.component.scss']
})
export class LancamentoListComponent implements OnInit {
  private lancamentoService = inject(LancamentoService);
  private categoriaService = inject(CategoriaService);
  private dialog = inject(MatDialog);

  lancamentos: Lancamento[] = [];
  categorias: Categoria[] = [];
  
  displayedColumns: string[] = [
    'idLancamento', 
    'descricao', 
    'categoria',
    'tipoLancamento', 
    'valorLancamento', 
    'dataVencimento', 
    'situacao', 
    'actions'
  ];

  ngOnInit(): void {
    this.loadCategorias();
    this.loadLancamentos();
  }

  loadCategorias(): void {
    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data;
    });
  }

  loadLancamentos(): void {
    this.lancamentoService.findAll().subscribe(data => {
      this.lancamentos = data;
    });
  }

  openForm(lancamento?: Lancamento): void {
    const dialogRef = this.dialog.open(LancamentoFormComponent, {
      width: '600px',
      data: lancamento
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadLancamentos();
      }
    });
  }

  deleteLancamento(id: number): void {
    if (confirm('Tem certeza que deseja deletar este lançamento?')) {
      this.lancamentoService.delete(id).subscribe({
        next: () => {
          this.loadLancamentos();
        },
        error: (err) => {
          alert('Erro ao deletar lançamento.');
          console.error(err);
        }
      });
    }
  }

  getSituacaoText(situacaoId: number): string {
    switch (situacaoId) {
      case 0: return 'EM ABERTO';
      case 1: return 'BAIXADO';
      case 2: return 'EM ATRASO';
      default: return 'Desconhecido';
    }
  }

  getTipoLancamentoText(tipoId: number): string {
    switch (tipoId) {
      case 0: return 'CRÉDITO';
      case 1: return 'DÉBITO';
      default: return 'DESCONHECIDO';
    }
  }

  // MÉTODO CORRIGIDO - Busca o nome da categoria pelo idCategoria
  getCategoriaNome(lancamento: Lancamento): string {
    if (!lancamento.idCategoria) return 'N/A';
    
    const categoria = this.categorias.find(cat => cat.idCategoria === lancamento.idCategoria);
    return categoria?.descricaoCategoria || `Categoria ${lancamento.idCategoria}`;
  }
}