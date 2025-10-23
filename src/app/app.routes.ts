import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guards';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Garante que a rota vazia vá para o dashboard
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      { path: '', redirectTo: 'bancos', pathMatch: 'full' },
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
  { path: '**', redirectTo: 'login' }
];
