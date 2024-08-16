import { ToastrService } from 'ngx-toastr';
import { inject, Inject } from '@angular/core';
import { routes } from './app.routes';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '../shared/toast/toast.service';

export const guardRouterGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const toast = inject(ToastService);

  const token = sessionStorage.getItem('token');

  if (token) {
    return true;
  }

  toast.error("Erro Interno", "Por favor, refaça o login !")
  router.navigate(['']);
  return false;
};
