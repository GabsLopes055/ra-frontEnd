import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { DividerComponent } from '../../../../../shared/divider/divider.component';
import { MenuService } from '../../../../../shared/menu/menu.service';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { ListComponent } from '../../../../../shared/table/list/list.component';
import { TableComponent } from '../../../../../shared/table/table.component';
import { TabsComponent } from '../../../../../shared/tabs/tabs.component';
import { filtroVenda, venda } from '../../../../interfaces/venda.model';
import { VendasService } from '../vendas/vendas.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TabsComponent,
    TableComponent,
    ListComponent,
    DividerComponent,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {

  @ViewChild('graficoBar', { static: true }) graficoBar!: ElementRef;
  @ViewChild('graficoLine', { static: true }) graficoLine!: ElementRef;
  grafico: any;

  vendas: venda[] = [];
  total: any;
  dataHoje: any = new Date().toISOString();


  filtroBusca: filtroVenda = {
    dataInicio: new Date(new Date().setHours(0, 0, 0, 0)),
    dataFim: new Date(new Date().setHours(0, 0, 0, 0)),
    pagina: 0,
    tamanhoPagina: 50,
  };

  constructor(
    private readonly menuService: MenuService,
    private readonly navbarService: NavbarService,
    private readonly vendasService: VendasService,
    private readonly toastService: ToastrService
  ) {
    this.menuService.setMenu({
      icon: 'dashboard',
      label: 'Dashboard',
      route: '',
      checked: true,
    });
    this.navbarService.setTitle('Dashboard');
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.listarVendasHoje();
    this.criarGraficoBar();
    this.criarGraficoLine();
  }

  listarVendasHoje() {
    this.vendasService.listarTodasAsVendas(this.filtroBusca).subscribe({
      next: (vendas) => {
        this.vendas = vendas.content.flat();
        this.total = this.vendas.reduce((acc, venda) => acc + venda.totalVenda, 0);
      },
      error: () => {
        this.toastService.error("Erro ao listar Vendas", "Erro Interno !")
      }
    });
  }

  formaPagamento(value: string | null): string {
    const formasPagamento: { [key: string]: string } = {
      CREDITO: 'Crédito',
      DEBITO: 'Débito',
      PIX: 'Pix',
      DINHEIRO: 'Dinheiro',
    };

    return formasPagamento[value || ''];
  }

  criarGraficoBar() {
    new Chart(this.graficoBar.nativeElement.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Dinheiro', 'PIX', 'Débito', 'Crédito', 'Débito', 'Débito', 'Crédito', 'Débito'],
        datasets: [
          {
            data: [17, 23, 39, 42, 22, 41, 39, 42],
            backgroundColor: ['#FF3131'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Grafico Pizza'
          }
        },
      },
    });
  }
  criarGraficoLine() {
    new Chart(this.graficoLine.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Dinheiro', 'PIX', 'Débito', 'Crédito'],
        datasets: [
          {
            label: 'Ano de 2023',
            data: [27, 23, 39, 42],
            borderColor: "#FFAC33",
            backgroundColor: ['#FFAC33'],
            yAxisID: 'y',
          },
          {
            label: ' Ano de 2024',
            data: [33, 29, 23, 48],
            borderColor: "#7f5410",
            backgroundColor: ['#7f5410'],
            yAxisID: 'y1',
          }
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: 'Grafico de Linha'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      },

    });
  }
}
