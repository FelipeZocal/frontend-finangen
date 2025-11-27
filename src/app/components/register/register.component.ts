import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para o *ngIf
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UsuarioService } from '../../core/services/usuario.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,         // Resolve erro NG8103 (*ngIf)
    ReactiveFormsModule,  // Resolve erro NG8002 (formGroup)
    MatCardModule,        // Resolve erro NG8001 (mat-card, mat-card-header, etc)
    MatFormFieldModule,   // Resolve erro NG8001 (mat-form-field)
    MatInputModule,       // Resolve erro do input
    MatButtonModule,      // Resolve erro do botão
    MatIconModule,
    RouterLink,            // Resolve a navegação de volta para login
    NgxMaskDirective
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  // Estas propriedades resolvem os erros NG9 (Property does not exist)
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor() {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      rg: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      status: [0], // 0 = ATIVO
      tipoPessoa: [[1]] // 1 = USUARIO (Enviado como array de IDs)
    });
  }

  // Este método resolve o erro NG9 (onSubmit does not exist)
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.errorMessage = null;
    const userData = this.registerForm.value;

    this.usuarioService.create(userData).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao realizar cadastro. Verifique os dados.';
        console.error(err);
      }
    });
  }
}
