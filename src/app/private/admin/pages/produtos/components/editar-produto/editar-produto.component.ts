import { categoria } from './../../../../../../interfaces/categoria.model';
import { ListarCategoriasComponent } from './../../../categorias/components/listar-categorias/listar-categorias.component';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProdutosService } from '../../produtos.service';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { InputComponent, optionsInput } from '../../../../../../../shared/input/input.component';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../../categorias/categorias.service';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.scss',
})
export class EditarProdutoComponent implements OnInit, OnDestroy {

  optionsCategorias: optionsInput[] = [];
  categoria: categoria[] = [];
  @Input() idProduto: string = '';

  formEditarProduto = new FormGroup({
    nomeProduto: new FormControl('', Validators.required),
    precoVenda: new FormControl('', Validators.required),
    precoCusto: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
  });

  constructor(
    private readonly produtoService: ProdutosService,
    private readonly categoriasService: CategoriasService,
    private readonly toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.buscarProdutoPorId();
  }
  ngOnDestroy(): void {}

  buscarProdutoPorId() {
    this.produtoService.buscarProdutoPorId(this.idProduto).subscribe({
      next: (produto) => {
        console.log(produto);
      },
    });
  }

  editarProduto() {
    alert('editar')
  }

  listarCategorias() {
    this.categoriasService
      .listarCategorias({ pagina: 0, tamanhoPagina: 100 })
      .subscribe({
        next: (categorias) => {
          this.categoria = categorias.content.flat() as categoria[];
          this.categoria.forEach((value) => {
            this.optionsCategorias.push({
              label: value.nomeCategoria,
              value: value.idCategoria,
            });
          });
        },
        error: (err) => {
          console.error('Erro ao listar categorias', err);
        },
      });
  }
}
