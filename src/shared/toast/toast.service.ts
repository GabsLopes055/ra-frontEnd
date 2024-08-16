import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toastr: ToastrService) {}

  success(titulo: string, mensagem: string) {
    this.toastr.success(mensagem, titulo);
  }

  error(titulo: string, mensagem: string) {
    this.toastr.error(mensagem, titulo);
  }

  warning(titulo: string, mensagem: string) {
    this.toastr.warning(mensagem, titulo);
  }

  info(titulo: string, mensagem: string) {
    this.toastr.info(mensagem, titulo);
  }
}
