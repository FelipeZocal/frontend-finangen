import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Categoria } from '../../../core/models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit {
  private categoriaService = inject(CategoriaService);
  private dialog = inject(MatDialog);

  categorias: Categoria[] = [];
  displayedColumns: string[] = ['idCategoria', 'descricaoCategoria', 'usuario', 'actions'];

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data;
    });
  }

  openForm(categoria?: Categoria): void {
    const dialogRef = this.dialog.open(CategoriaFormComponent, {
      width: '450px',
      data: categoria
    });

    dialogRef.afterClosed().subscribe(result => {
      // Se o formulário retornou 'true', recarrega a lista
      if (result) {
        this.loadCategorias();
      }
    });
  }

  deleteCategoria(id: number): void {
    // Adicionar um dialog de confirmação para melhor UX
    if (confirm('Tem certeza que deseja deletar esta categoria?')) {
      this.categoriaService.delete(id).subscribe({
        next: () => {
          this.loadCategorias();
          // Idealmente, mostrar uma notificação de sucesso (snackbar)
        },
        error: (err) => {
          // Mostrar notificação de erro
          console.error('Erro ao deletar categoria:', err);
        }
      });
    }
  }
}
