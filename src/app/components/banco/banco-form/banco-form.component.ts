import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Banco } from '../../../core/models/banco.model';
import { BancoService } from '../../../core/services/banco.service';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-banco-form',
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
  templateUrl: './banco-form.component.html',
  styleUrls: ['./banco-form.component.scss']
})
export class BancoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bancoService = inject(BancoService);

  bancoForm: FormGroup;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<BancoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Banco
  ) {
    this.isEditMode = !!data;
    this.bancoForm = this.fb.group({
      razaoSocial: ['', Validators.required],
      status: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.bancoForm.patchValue(this.data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.bancoForm.invalid) {
      return;
    }
    const formValue = this.bancoForm.value;
    const saveObservable = this.isEditMode
      ? this.bancoService.update(this.data.idBanco, formValue)
      : this.bancoService.create(formValue);

    saveObservable.subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
