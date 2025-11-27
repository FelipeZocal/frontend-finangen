import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgxMaskPipe } from 'ngx-mask';

import { Usuario } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgxMaskPipe
  ],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private dialog = inject(MatDialog);

  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'status', 'actions'];

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.findAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  openForm(usuario?: Usuario): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      width: '500px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsuarios();
      }
    });
  }

  deleteUsuario(id: number): void {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      this.usuarioService.delete(id).subscribe({
        next: () => {
          this.loadUsuarios();
          // Adicionar snackbar de sucesso aqui
        },
        error: (err) => {
          // Adicionar snackbar de erro com a mensagem da API
          alert(err.error.message || 'Erro ao deletar usuário.');
          console.error(err);
        }
      });
    }
  }
}
