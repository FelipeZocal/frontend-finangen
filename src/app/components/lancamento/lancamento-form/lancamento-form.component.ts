import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Lancamento } from '../../../core/models/lancamento.model';
import { Usuario } from '../../../core/models/usuario.model';
import { Categoria } from '../../../core/models/categoria.model';
import { ContaBancaria } from '../../../core/models/conta-bancaria.model';

import { LancamentoService } from '../../../core/services/lancamento.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { ContaBancariaService } from '../../../core/services/conta-bancaria.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lancamento-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule
  ],
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.scss']
})
export class LancamentoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private lancamentoService = inject(LancamentoService);
  private usuarioService = inject(UsuarioService);
  private categoriaService = inject(CategoriaService);
  private contaBancariaService = inject(ContaBancariaService);

  lancamentoForm: FormGroup;
  isEditMode: boolean;

  // Listas para os selects
  usuarios: Usuario[] = [];
  categorias: Categoria[] = [];
  contas: ContaBancaria[] = [];

  // Enums do backend
  tiposLancamento = [{ id: 0, descricao: 'CRÉDITO' }, { id: 1, descricao: 'DÉBITO' }];
  situacoes = [{ id: 0, descricao: 'EM ABERTO' }, { id: 1, descricao: 'BAIXADO' }, { id: 2, descricao: 'EM ATRASO' }];

  constructor(
    public dialogRef: MatDialogRef<LancamentoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lancamento
  ) {
    this.isEditMode = !!data;
    this.lancamentoForm = this.fb.group({
      descricao: ['', Validators.required],
      valorLancamento: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      dataLancamento: [new Date(), Validators.required],
      dataVencimento: [new Date(), Validators.required],
      dataBaixa: [new Date(), Validators.required],
      tipoLancamento: [null, Validators.required],
      situacao: [null, Validators.required],
      id: [null, Validators.required], // Usuário
      idCategoria: [null, Validators.required],
      idConta: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSelectData();
    if (this.isEditMode) {
      // Ajuste para carregar datas corretamente no form
      const formData = {
        ...this.data,
        dataLancamento: new Date(this.data.dataLancamento),
        dataVencimento: new Date(this.data.dataVencimento),
        dataBaixa: new Date(this.data.dataBaixa),
      };
      this.lancamentoForm.patchValue(formData);
    }
  }

  loadSelectData(): void {
    forkJoin({
      usuarios: this.usuarioService.findAll(),
      categorias: this.categoriaService.findAll(),
      contas: this.contaBancariaService.findAll()
    }).subscribe(({ usuarios, categorias, contas }) => {
      this.usuarios = usuarios;
      this.categorias = categorias;
      this.contas = contas;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.lancamentoForm.invalid) {
      this.lancamentoForm.markAllAsTouched();
      return;
    }
    const formValue = this.lancamentoForm.value;
    // Formata as datas para o padrão esperado pela API (dd/MM/yyyy) se necessário
    const payload = {
      ...formValue,
      dataLancamento: this.formatDate(formValue.dataLancamento),
      dataVencimento: this.formatDate(formValue.dataVencimento),
      dataBaixa: this.formatDate(formValue.dataBaixa)
    };

    const saveObservable = this.isEditMode
      ? this.lancamentoService.update(this.data.idLancamento, payload)
      : this.lancamentoService.create(payload);

    saveObservable.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Erro ao salvar lançamento:', err)
    });
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
