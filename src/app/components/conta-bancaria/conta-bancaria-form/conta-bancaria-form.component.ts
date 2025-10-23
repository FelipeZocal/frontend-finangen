import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { ContaBancaria } from '../../../core/models/conta-bancaria.model';
import { Usuario } from '../../../core/models/usuario.model';
import { Banco } from '../../../core/models/banco.model';

import { ContaBancariaService } from '../../../core/services/conta-bancaria.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { BancoService } from '../../../core/services/banco.service';

@Component({
  selector: 'app-conta-bancaria-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule
  ],
  templateUrl: './conta-bancaria-form.component.html',
  styleUrls: ['./conta-bancaria-form.component.scss']
})
export class ContaBancariaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contaBancariaService = inject(ContaBancariaService);
  private usuarioService = inject(UsuarioService);
  private bancoService = inject(BancoService);

  contaForm: FormGroup;
  isEditMode: boolean;
  usuarios: Usuario[] = [];
  bancos: Banco[] = [];

  // Mapeamento para os tipos de conta do enum no backend
  tiposConta = [
    { id: 0, descricao: 'CONTA CORRENTE' },
    { id: 1, descricao: 'CONTA INVESTIMENTO' },
    { id: 2, descricao: 'CARTÃO DE CRÉDITO' },
    { id: 3, descricao: 'ALIMENTAÇÃO' },
    { id: 4, descricao: 'CONTA POUPANÇA' }
  ];

  constructor(
    public dialogRef: MatDialogRef<ContaBancariaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContaBancaria
  ) {
    this.isEditMode = !!data;
    this.contaForm = this.fb.group({
      descricaoConta: ['', Validators.required],
      agenciaConta: ['', Validators.required],
      numeroConta: ['', Validators.required],
      limiteConta: ['', Validators.required],
      saldoConta: [0, [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      tipoConta: [null, Validators.required],
      id: [null, Validators.required], // id do usuário
      idBanco: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadBancos();
    if (this.isEditMode) {
      this.contaForm.patchValue(this.data);
    }
  }

  loadUsuarios(): void {
    this.usuarioService.findAll().subscribe(data => this.usuarios = data);
  }

  loadBancos(): void {
    this.bancoService.findAll().subscribe(data => this.bancos = data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.contaForm.invalid) {
      this.contaForm.markAllAsTouched();
      return;
    }

    const formValue = this.contaForm.value;
    const saveObservable = this.isEditMode
      ? this.contaBancariaService.update(this.data.idConta, formValue)
      : this.contaBancariaService.create(formValue);

    saveObservable.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Erro ao salvar conta bancária:', err)
    });
  }
}
