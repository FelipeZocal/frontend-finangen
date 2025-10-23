import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { Usuario } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-usuario-form',
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
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);

  usuarioForm: FormGroup;
  isEditMode: boolean;
  errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<UsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {
    this.isEditMode = !!data;
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      rg: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', this.isEditMode ? [] : Validators.required], // Senha obrigatória apenas na criação
      status: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.usuarioForm.patchValue(this.data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    const formValue = this.usuarioForm.value;
    const saveObservable = this.isEditMode
      ? this.usuarioService.update(this.data.id, formValue)
      : this.usuarioService.create(formValue);

    saveObservable.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        // Exibe a mensagem de erro vinda da API (ex: "CPF já cadastrado")
        this.errorMessage = err.error.message || 'Ocorreu um erro ao salvar.';
        console.error(err);
      }
    });
  }
}
