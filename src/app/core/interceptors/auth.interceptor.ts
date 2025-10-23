import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const isApiUrl = req.url.startsWith(environment.apiUrl);

  if (token && isApiUrl) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `${token}` // O backend já espera "Bearer " no token gerado
      }
    });
    return next(cloned);
  }

  return next(req);
};
