import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isRegisterMode: boolean = false;
  isLoading: boolean = false;

  constructor() {
    // Formulário de Login
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Formulário de Cadastro
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validators: this.senhasConferem });
  }

  // **MÉTODO formatarCpf ADICIONADO AQUI**
  formatarCpf(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    // Aplica a formatação
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
    } else if (value.length > 6 && value.length <= 9) {
      value = value.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
    } else if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    // Atualiza o valor no input
    input.value = value;
    
    // Atualiza o valor no formulário
    this.registerForm.patchValue({ cpf: value });
  }

  // Validador customizado para confirmar senha
  private senhasConferem(control: AbstractControl) {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');
    
    if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
      return { senhasNaoConferem: true };
    }
    return null;
  }

  setLoginMode(): void {
    this.isRegisterMode = false;
    this.clearMessages();
  }

  setRegisterMode(): void {
    this.isRegisterMode = true;
    this.clearMessages();
  }

  clearMessages(): void {
    this.errorMessage = null;
    this.successMessage = null;
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.errorMessage = null;
    this.isLoading = true;

    const creds = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.loginForm.disable();
    
    this.authService.login(creds).pipe(
      finalize(() => {
        this.loginForm.enable();
        this.isLoading = false;
      })
    ).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Email ou senha incorretos.';
        } else if (err.status === 403) {
          this.errorMessage = 'Conta inativa. Entre em contato com o administrador.';
        } else {
          this.errorMessage = 'Erro ao fazer login. Tente novamente.';
        }
        console.error('Erro no login:', err);
      }
    });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.errorMessage = null;
    this.successMessage = null;
    this.isLoading = true;

    // Prepara os dados para envio (remove a máscara do CPF)
    const userData = {
      nome: this.registerForm.get('nome')?.value,
      cpf: this.registerForm.get('cpf')?.value.replace(/\D/g, ''),
      email: this.registerForm.get('email')?.value,
      senha: this.registerForm.get('senha')?.value
    };

    console.log('Dados para cadastro:', userData);

    this.registerForm.disable();
    
    // **ALTERE AQUI para usar seu serviço real quando tiver**
    this.simularCadastro(userData).pipe(
      finalize(() => {
        this.isLoading = false;
        this.registerForm.enable();
      })
    ).subscribe({
      next: (response) => {
        this.successMessage = 'Cadastro realizado com sucesso! Você já pode fazer login.';
        this.registerForm.reset();
        
        // Alterna automaticamente para login após 3 segundos
        setTimeout(() => {
          this.setLoginMode();
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
        console.error('Erro no cadastro:', err);
      }
    });
  }

  // **MÉTODO simularCadastro ADICIONADO AQUI**
  private simularCadastro(userData: any): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        console.log('Usuário cadastrado (simulado):', userData);
        observer.next({ message: 'Cadastro realizado com sucesso!' });
        observer.complete();
      }, 1500);
    });
  }

  // Marca todos os campos como touched para mostrar erros
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}