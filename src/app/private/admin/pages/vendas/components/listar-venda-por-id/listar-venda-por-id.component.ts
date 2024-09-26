import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { VendasService } from '../../vendas.service';
import { venda } from './../../../../../../interfaces/venda.model';

@Component({
  selector: 'app-listar-venda-por-id',
  standalone: true,
  imports: [],
  templateUrl: './listar-venda-por-id.component.html',
  styleUrl: './listar-venda-por-id.component.scss'
})
export class ListarVendaPorIdComponent implements OnInit, OnDestroy {

  @Input() idVenda : string | null = '';

  venda!: venda;

  constructor(
    private readonly vendasService: VendasService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.vendasService.buscarVendaPorId(this.idVenda as string).subscribe({
      next: (value) => {
        this.venda = value;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  ngOnDestroy(): void {
  }

}
