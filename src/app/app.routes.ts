import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guards';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  // Redireciona a rota raiz para login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rota de login (acesso livre)
  { path: 'login', component: LoginComponent },

  // Rota de registro
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },

  // Rotas protegidas
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      // Redireciona para dashboard quando acessar rotas protegidas
      { path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'bancos',
        loadComponent: () => import('./components/banco/banco-list/banco-list.component').then(m => m.BancoListComponent)
      },
      {
        path: 'categorias',
        loadComponent: () => import('./components/categoria/categoria-list/categoria-list.component').then(m => m.CategoriaListComponent)
      },
      {
        path: 'contas',
        loadComponent: () => import('./components/conta-bancaria/conta-bancaria-list/conta-bancaria-list.component').then(m => m.ContaBancariaListComponent)
      },
      {
        path: 'lancamentos',
        loadComponent: () => import('./components/lancamento/lancamento-list/lancamento-list.component').then(m => m.LancamentoListComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./components/usuario/usuario-list/usuario-list.component').then(m => m.UsuarioListComponent)
      },
    ]
  },

  // Redireciona rotas não encontradas para login
  { path: '**', redirectTo: 'login' }
];
