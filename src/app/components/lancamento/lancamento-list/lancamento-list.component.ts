import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ParseDatePipe } from '../../../shared/pipes/parse-date.pipe';

import { Lancamento } from '../../../core/models/lancamento.model';
import { LancamentoService } from '../../../core/services/lancamento.service';
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
    CurrencyPipe, // Formata a inserção do dinheiro
    ParseDatePipe, // Converte a string para formato DATA
    DatePipe      // Formata a inserção de datas
  ],
  templateUrl: './lancamento-list.component.html',
  styleUrls: ['./lancamento-list.component.scss']
})
export class LancamentoListComponent implements OnInit {
  private lancamentoService = inject(LancamentoService);
  private dialog = inject(MatDialog);

  lancamentos: Lancamento[] = [];
  displayedColumns: string[] = ['idLancamento', 'descricao', 'valorLancamento', 'dataVencimento', 'situacao', 'actions'];

  ngOnInit(): void {
    this.loadLancamentos();
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

  // Transforma o Enum da API em String para ser exibido
  getSituacaoText(situacaoId: number): string {
    switch (situacaoId) {
      case 0: return 'EM ABERTO';
      case 1: return 'BAIXADO';
      case 2: return 'EM ATRASO';
      default: return 'Desconhecido';
    }
  }
}
