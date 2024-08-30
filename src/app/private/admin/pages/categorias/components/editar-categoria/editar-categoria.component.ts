import { categoria } from './../../../../../../interfaces/categoria.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CategoriasService } from '../../categorias.service';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { InputComponent } from "../../../../../../../shared/input/input.component";
import { ButtonComponent } from "../../../../../../../shared/button/button.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { valuesCategoria } from '../listar-categorias/listar-categorias.component';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.scss'
})
export class EditarCategoriaComponent implements OnDestroy, OnInit {

  @Input() idCategoria: string = '';

  passarValores!: valuesCategoria;
  categoria!: categoria;

  formEditar = new FormGroup({
    idCategoria: new FormControl('', Validators.required),
    nomeCategoria: new FormControl('', Validators.required),
  });

  constructor(
    private readonly categoriaService: CategoriasService,
    private readonly toastService: ToastService
  ){}

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.buscarCategoria();
  }

  buscarCategoria() {
    this.categoriaService.buscarCategoriaPorId(this.idCategoria).subscribe({
      next: (value) => {
        this.formEditar.setValue({
          idCategoria: value.idCategoria,
          nomeCategoria: value.nomeCategoria
        })
      }
    });
  }

  editarCategoria() {
    this.categoriaService.editarCategoria(this.idCategoria, this.formEditar.value as categoria).subscribe({
      next: (value) => {

        this.passarValores = {
          idCategoria: this.idCategoria,
          labelComponent: 'app-listar-categorias',
        };

        this.categoriaService.listarProdutosDaCategoria.next(this.passarValores);
        this.toastService.success("Sucesso", "Categoria Editada com Sucesso");
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


}
