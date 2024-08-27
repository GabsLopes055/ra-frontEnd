import { Component } from '@angular/core';
import { InputComponent } from '../../../../../../../shared/input/input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { CategoriasService } from '../../categorias.service';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { categoriaRequest } from '../../../../../../interfaces/categoria.model';

@Component({
  selector: 'app-cadastrar-categoria',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './cadastrar-categoria.component.html',
  styleUrl: './cadastrar-categoria.component.scss',
})
export class CadastrarCategoriaComponent {

  constructor(
    private readonly categoriaService: CategoriasService,
    private readonly toastService: ToastService
  ){}

  formCadastrar = new FormGroup({
    nomeCategoria: new FormControl('', Validators.required),
  });

  cadastrarCategoria() {
    if(this.formCadastrar.valid) {
      this.categoriaService.cadastrarCategoria(this.formCadastrar.value as categoriaRequest).subscribe({
        next: (categoria) => {
          this.toastService.success('Sucesso', 'Categoria Cadastrada com Sucesso !');
          this.formCadastrar.reset();
        }
      })
    } else {
      this.toastService.info('Atenção', 'Preencha o formulário corretamente !');
    }
  }
}
