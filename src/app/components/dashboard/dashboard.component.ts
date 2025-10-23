import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Models
import { Banco } from '../../core/models/banco.model';
import { Categoria } from '../../core/models/categoria.model';
import { ContaBancaria } from '../../core/models/conta-bancaria.model';
import { Lancamento } from '../../core/models/lancamento.model';
import { Usuario } from '../../core/models/usuario.model';

// Services
import { BancoService } from '../../core/services/banco.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { ContaBancariaService } from '../../core/services/conta-bancaria.service';
import { LancamentoService } from '../../core/services/lancamento.service';
import { UsuarioService } from '../../core/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Injeção de todos os serviços necessários
  private bancoService = inject(BancoService);
  private categoriaService = inject(CategoriaService);
  private contaBancariaService = inject(ContaBancariaService);
  private lancamentoService = inject(LancamentoService);
  private usuarioService = inject(UsuarioService);

  // Propriedades para armazenar o primeiro item de cada lista
  previewBanco?: Banco;
  previewCategoria?: Categoria;
  previewConta?: ContaBancaria;
  previewLancamento?: Lancamento;
  previewUsuario?: Usuario;

  isLoading = true;

  ngOnInit(): void {
    // forkJoin executa todas as chamadas em paralelo e retorna quando todas estiverem completas
    forkJoin({
      bancos: this.bancoService.findAll(),
      categorias: this.categoriaService.findAll(),
      contas: this.contaBancariaService.findAll(),
      lancamentos: this.lancamentoService.findAll(),
      usuarios: this.usuarioService.findAll()
    }).subscribe(({ bancos, categorias, contas, lancamentos, usuarios }) => {
      // Pega o primeiro item de cada array (se existir)
      this.previewBanco = bancos[0];
      this.previewCategoria = categorias[0];
      this.previewConta = contas[0];
      this.previewLancamento = lancamentos[0];
      this.previewUsuario = usuarios[0];

      this.isLoading = false;
    });
  }
}
