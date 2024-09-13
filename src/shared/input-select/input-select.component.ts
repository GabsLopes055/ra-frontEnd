import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
import { ProdutosService } from '../../app/private/admin/pages/produtos/produtos.service';
import { filtroDeBuscaProduto, produtos } from '../../app/interfaces/produtos.model';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'gbs-input-select',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss'
})
export class InputSelectComponent {

  isOpen = false;
  isFocused!: boolean;
  nomeProdutoSelecionado: string = '';

  @Input() type: string = 'text';
  @Input() icon!: string;
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() mask: string = '';
  @Input() disabled: boolean = false;
  @Input() iconPosition: string = 'right';

  @Output() produtoSelecionado = new EventEmitter();

  produtos!: produtos[];

  filtroBusca: filtroDeBuscaProduto = {
    tipoProduto: null,
    pagina: 0,
    tamanhoPagina: 20,
  };

  constructor(
    private readonly produtoService: ProdutosService,
    private readonly toastService: ToastService
  ) {}

  abrirOption() {
    this.control.valueChanges.pipe(debounceTime(700)).subscribe((value) => {
      if(value != '') {
        this.isOpen = true
        this.filtroBusca.tipoProduto = value;
        this.listarProdutos();
      } else {
        this.isOpen = false
      }
    });
  }

  listarProdutos() {
    this.produtoService.listarProdutos(this.filtroBusca).subscribe({
      next: (produtos) => {
        this.produtos = produtos.content.flat();
      },
      error: (error) => {
        this.toastService.error('Erro Interno', 'Erro ao listar Produtos !');
      },
    });
  }


  retornarProdutoSelecionado(produto: produtos) {
    this.nomeProdutoSelecionado = produto.nomeProduto;
    this.control.setValue('');
    this.isOpen = false;
    this.isFocused = false;
    this.produtoSelecionado.emit(produto);
  }
}
