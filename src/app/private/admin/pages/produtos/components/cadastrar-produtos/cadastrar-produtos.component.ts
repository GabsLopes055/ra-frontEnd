import { FiltroDeBusca } from './../../../../../../interfaces/paginated.model';
import { CategoriasService } from './../../../categorias/categorias.service';
import { ProdutosService } from './../../produtos.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  InputComponent,
  optionsInput,
} from '../../../../../../../shared/input/input.component';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { categoria } from '../../../../../../interfaces/categoria.model';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import {
  produtoRequest,
  produtos,
} from '../../../../../../interfaces/produtos.model';

@Component({
  selector: 'app-cadastrar-produtos',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './cadastrar-produtos.component.html',
  styleUrl: './cadastrar-produtos.component.scss',
})
export class CadastrarProdutosComponent implements OnInit, OnDestroy {

  categoria: categoria[] = [];
  optionsCategorias: optionsInput[] = [];

  formCadastrarProduto = new FormGroup({
    nomeProduto: new FormControl('', Validators.required),
    precoVenda: new FormControl('', Validators.required),
    precoCusto: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
  });

  constructor(
    private readonly produtosService: ProdutosService,
    private readonly categoriasService: CategoriasService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
  }
  ngOnDestroy(): void {}

  cadastrarProduto() {

    if (this.formCadastrarProduto.valid) {
      const formValues = this.formCadastrarProduto.value;

      const produto = {
        nomeProduto: formValues.nomeProduto || '', // Converte null para string vazia
        precoVenda: parseFloat(formValues.precoVenda || '0'), // Converte string para número
        precoCompra: parseFloat(formValues.precoCusto || '0'), // Ajuste o nome da propriedade conforme necessário
        quantidade: parseInt(formValues.quantidade || '0'), // Converte string para número inteiro
        categoria: {
          idCategoria: formValues.categoria || '', // Converte null para string vazia
          nomeCategoria: '', // Preencha conforme necessário se for parte do request
        },
      };

      this.produtosService
        .cadastrarProduto(produto as produtoRequest)
        .subscribe({
          next: (value) => {
            this.toastService.success(
              'Sucesso',
              'Produto cadastrado com sucesso!'
            );
            this.formCadastrarProduto.reset();
            this.ngOnInit();
          },
          error: (error) => {
            this.toastService.error(
              'Erro interno',
              'Erro ao cadastrar produto!'
            );
          },
        });
    } else {
      this.toastService.info('Atenção', 'Preencha o formulário corretamente!');
    }
  }

  listarCategorias() {
    this.categoriasService
      .listarCategorias({ pagina: 0, tamanhoPagina: 100 })
      .subscribe({
        next: (categorias) => {
          this.categoria = categorias.content.flat() as categoria[];
          this.optionsCategorias = [{ label: 'Selecione uma categoria', value: '' }]
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
