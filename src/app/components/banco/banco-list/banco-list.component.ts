import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Banco } from '../../../core/models/banco.model';
import { BancoService } from '../../../core/services/banco.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BancoFormComponent } from '../banco-form/banco-form.component';

@Component({
  selector: 'app-banco-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './banco-list.component.html',
  styleUrls: ['./banco-list.component.scss']
})
export class BancoListComponent implements OnInit {
  private bancoService = inject(BancoService);
  private dialog = inject(MatDialog);

  bancos: Banco[] = [];
  displayedColumns: string[] = ['idBanco', 'razaoSocial', 'status', 'actions'];

  ngOnInit(): void {
    this.loadBancos();
  }

  loadBancos(): void {
    this.bancoService.findAll().subscribe(data => {
      this.bancos = data;
    });
  }

  openForm(banco?: Banco): void {
    const dialogRef = this.dialog.open(BancoFormComponent, {
      width: '400px',
      data: banco
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBancos();
      }
    });
  }

  deleteBanco(id: number): void {
    if (confirm('Tem certeza que deseja deletar este banco?')) {
      this.bancoService.delete(id).subscribe(() => {
        this.loadBancos();
        // Adicionar snackbar de sucesso aqui
      });
    }
  }
}
