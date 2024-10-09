import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import {
  InputComponent,
  optionsInput,
} from '../../../../../../../shared/input/input.component';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { CategoriasService } from '../../../categorias/categorias.service';
import { ProdutosService } from '../../produtos.service';
import { categoria } from './../../../../../../interfaces/categoria.model';
import { produtos } from '../../../../../../interfaces/produtos.model';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.scss',
})
export class EditarProdutoComponent implements OnInit, AfterViewInit {
  optionsCategorias: optionsInput[] = [];
  labelCategoria: optionsInput[] = [];
  categoria: categoria[] = [];
  @Input() idProduto: string = '';

  formEditarProduto = new FormGroup({
    idProduto: new FormControl('', Validators.required),
    nomeProduto: new FormControl('', Validators.required),
    precoVenda: new FormControl('', Validators.required),
    precoCompra: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    idCategoria: new FormControl('', Validators.required),
    nomeCategoria: new FormControl('', Validators.required),
  });

  constructor(
    private readonly produtoService: ProdutosService,
    private readonly categoriasService: CategoriasService,
    private readonly toastService: ToastService
  ) {}
  ngAfterViewInit(): void {
    this.listarCategorias();
  }
  ngOnInit(): void {
    this.buscarProdutoPorId();
  }

  buscarProdutoPorId() {
    this.produtoService.buscarProdutoPorId(this.idProduto).subscribe({
      next: (produto) => {
        this.formEditarProduto.controls.idProduto.setValue(produto.idProduto);
        this.formEditarProduto.controls.nomeProduto.setValue(
          produto.nomeProduto
        );
        this.formEditarProduto.controls.precoCompra.setValue(
          String(produto.precoCompra)
        );
        this.formEditarProduto.controls.precoVenda.setValue(
          String(produto.precoVenda)
        );
        this.formEditarProduto.controls.quantidade.setValue(
          String(produto.quantidade)
        );
        this.formEditarProduto.controls.idCategoria.setValue(
          produto.categoria.idCategoria
        );
        this.formEditarProduto.controls.nomeCategoria.setValue(
          produto.categoria.nomeCategoria
        );
      },
    });
  }

  editarProduto() {
    if (this.formEditarProduto.valid) {
      const produto: produtos = {
        idProduto: this.formEditarProduto.controls.idProduto.value,
        nomeProduto: this.formEditarProduto.controls.nomeProduto.value,
        precoVenda: Number(this.formEditarProduto.controls.precoVenda.value),
        precoCompra: Number(this.formEditarProduto.controls.precoCompra.value),
        quantidade: Number(this.formEditarProduto.controls.quantidade.value),
        categoria: {
          idCategoria: String(
            this.formEditarProduto.controls.idCategoria.value
          ),
          nomeCategoria: String(
            this.formEditarProduto.controls.nomeCategoria.value
          ),
        },
      };

      this.produtoService.editarProduto(this.idProduto, produto).subscribe({
        next: (produto) => {
          this.toastService.success('Sucesso', 'Produto Editado !');
        },
        error: (error) => {
          this.toastService.error('Erro Interno', 'Erro interno');
        },
      });
    }
  }

  listarCategorias() {
    this.categoriasService
      .listarCategorias({ pagina: 0, tamanhoPagina: 100 })
      .subscribe({
        next: (categorias) => {
          this.categoria = categorias.content.flat() as categoria[];
          this.categoria.forEach((categoria) => {
            this.optionsCategorias.push({
              label: categoria.nomeCategoria,
              value: categoria.idCategoria,
            });
          });
        },
        error: (err) => {
          console.error('Erro ao listar categorias', err);
        },
      });
  }
}
