import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ContaBancaria } from '../../../core/models/conta-bancaria.model';
import { ContaBancariaService } from '../../../core/services/conta-bancaria.service';
import { ContaBancariaFormComponent } from '../conta-bancaria-form/conta-bancaria-form.component';

@Component({
  selector: 'app-conta-bancaria-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CurrencyPipe // Importante para formatar o saldo
  ],
  templateUrl: './conta-bancaria-list.component.html',
  styleUrls: ['./conta-bancaria-list.component.scss']
})
export class ContaBancariaListComponent implements OnInit {
  private contaBancariaService = inject(ContaBancariaService);
  private dialog = inject(MatDialog);

  contas: ContaBancaria[] = [];
  displayedColumns: string[] = ['idConta', 'descricaoConta', 'banco', 'numeroConta', 'saldoConta', 'actions'];

  ngOnInit(): void {
    this.loadContas();
  }

  loadContas(): void {
    this.contaBancariaService.findAll().subscribe(data => {
      this.contas = data;
    });
  }

  openForm(conta?: ContaBancaria): void {
    const dialogRef = this.dialog.open(ContaBancariaFormComponent, {
      width: '500px',
      data: conta
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadContas();
      }
    });
  }

  deleteConta(id: number): void {
    if (confirm('Tem certeza que deseja deletar esta conta bancária?')) {
      this.contaBancariaService.delete(id).subscribe({
        next: () => {
          this.loadContas();
          // Idealmente, adicionar um snackbar de sucesso aqui
        },
        error: (err) => {
          alert('Erro ao deletar a conta bancária.');
          console.error(err);
        }
      });
    }
  }
}
