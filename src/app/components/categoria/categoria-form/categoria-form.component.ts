import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { Categoria } from '../../../core/models/categoria.model';
import { Usuario } from '../../../core/models/usuario.model';
import { CategoriaService } from '../../../core/services/categoria.service';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);
  private usuarioService = inject(UsuarioService);

  categoriaForm: FormGroup;
  isEditMode: boolean;
  usuarios: Usuario[] = [];

  constructor(
    public dialogRef: MatDialogRef<CategoriaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categoria
  ) {
    this.isEditMode = !!data;
    this.categoriaForm = this.fb.group({
      descricaoCategoria: ['', [Validators.required, Validators.minLength(3)]],
      // CORREÇÃO: Removido o '' inválido.
      // A chave 'id' aqui corresponde ao campo 'id' do CategoriaDTO, que é o ID do usuário (Pessoa).
      id: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
    if (this.isEditMode) {
      this.categoriaForm.patchValue(this.data);
    }
  }

  loadUsuarios(): void {
    this.usuarioService.findAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }

    const formValue = this.categoriaForm.value;
    const saveObservable = this.isEditMode
      ? this.categoriaService.update(this.data.idCategoria, formValue)
      : this.categoriaService.create(formValue);

    saveObservable.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Erro ao salvar categoria:', err)
    });
  }
}
