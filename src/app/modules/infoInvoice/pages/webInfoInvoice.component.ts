import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Environment } from '@core/config/environment';
import { HttpBaseAppService } from '@core/services/http-base-app.service';
import {
  PlanillaDetalleFacturasResponse,
  PedidoDetalle,
  PedidoData,
  DataPayment,
  PedidoDetalleData
} from 'src/app/interface/webInfoInvoice';

@Component({
  standalone: true,
  selector: 'app-web-info-invoice',
  templateUrl: './webInfoInvoice.component.html',
  styleUrls: ['./webInfoInvoice.component.css'],
  imports: [CommonModule]
})
export class WebInfoInvoiceComponent implements OnInit {
  activeTab: 'delivered' | 'rejected' = 'delivered';
  loading = false;

  delivery: PedidoDetalle[] = [];
  pedidoData: PedidoData | null = null;
  dataPayment: DataPayment[] = [];
  pedidosDetalleData: PedidoDetalleData[] = [];
  refused: PedidoDetalle[] = [];

  totalPaid = 0;
  totalRefused = 0;

  // Parámetros para la API
  params: any = {
    direccion_id: "100"
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private httpAppService: HttpBaseAppService,
  ) { }

  ngOnInit() {
    this.loadWsByDirection();
  }

  loadWsByDirection() {
    this.loading = true;

    const requestParams = {
      ...this.params,
    };

    this.httpAppService
      .getPlanillaDetalleFacturas(requestParams)
      .subscribe({
        next: (res: PlanillaDetalleFacturasResponse) => {
          if (res.success && res.data) {
            this.delivery = res.data.delivery;
            this.refused = res.data.refused;
            this.pedidoData = res.data.pedidos_data;
            this.dataPayment = res.data.data_payment;
            this.pedidosDetalleData = res.data.pedidos_detalle_data;
            this.calcularTotalPaid();
            this.calcularTotalRefuesd();
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar de datos:', err);
          this.loading = false;
        }
      });
  }

  // Método para cambiar pestaña
  setActiveTab(tab: 'delivered' | 'rejected'): void {
    this.activeTab = tab;
  }

  get rejectedProducts() {
    return this.refused
      .filter(item => (item.unidadesRechazadas ?? 0) > 0)
      .map(item => ({
        units: item.unidadesRechazadas ?? 0,
        name: item.nombre,
        subtotal: item.totalDineroEntrega ?? 0
      }));
  }


  get delivered() {
    if (this.activeTab === 'delivered') {
      return this.delivery
        .map(item => ({
          units: item.unidadesEntregadas,
          name: item.nombre,
          subtotal: item.totalDineroEntrega
        }));
    } else {
      return this.delivery
        .filter(item => item.unidadesEntregadas === 0)
        .map(item => ({
          units: 0,
          name: item.nombre,
          subtotal: 0
        }));
    }
  }

  get products() {
    if (this.activeTab === 'rejected') {
      return this.rejectedProducts;
    } else {
      return this.delivered;
    }
  }

  get summary() {
    if (!this.pedidoData || !this.dataPayment?.length) {
      return null;
    }

    const subtotal = this.delivery.reduce(
      (total, item) => total + (item.totalDineroEntrega ?? 0),
      0
    );

    const totalPaid = this.dataPayment.reduce(
      (total, pago) => total + (Number(pago.valor) || 0),
      0
    );

    const paymentMap = new Map<string, number>();
    this.dataPayment.forEach(pago => {
      const metodo = pago.metodoPago?.trim() || 'Método no especificado';
      const valor = Number(pago.valor) || 0;

      paymentMap.set(metodo, (paymentMap.get(metodo) || 0) + valor);
    });

    const groupedPayments = Array.from(paymentMap.entries()).map(
      ([method, amount]) => ({
        method,
        amount
      })
    );

    return {
      orderNumber: this.pedidoData.codigo ?? 'N/A',
      invoiceNumber: this.pedidoData.numero_factura ?? 'N/A',
      subtotal,
      financialDiscount: 0,
      rejectedProducts: subtotal,
      totalPaid,
      payments: groupedPayments
    };
  }

  // Total pagado
  getTotalPaid(): number {
    return this.dataPayment.reduce((total, pago) => {
      return total + parseFloat(pago.valor);
    }, 0);
  }

  get subtotal() {
    if (this.activeTab === 'delivered') {
      return this.delivery
        .map(item => ({
          units: item.unidadesEntregadas,
          name: item.nombre,
          subtotal: item.totalDineroEntrega
        }));
    } else {
      return this.delivery
        .filter(item => item.unidadesEntregadas === 0)
        .map(item => ({
          units: 0,
          name: item.nombre,
          subtotal: 0
        }));
    }
  }

  calcularTotalPaid() {
    this.totalPaid = this.pedidosDetalleData.reduce((total, item) => {
      const valorBase = item.valor_base_producto ?? 0;
      const unidades = item.unidades_solicitadas ?? 0;
      const impuestos = item.total_impuestos ?? 0;

      return total + (valorBase * unidades) + impuestos;
    }, 0);
  }

  calcularTotalRefuesd() {
    this.totalRefused = this.pedidosDetalleData.reduce((total, item) => {
      const valorBase = item.valor_base_producto ?? 0;
      const unidades = item.unidades_rechazadas ?? 0;
      const impuestos = item.total_impuestos ?? 0;

      return total + (valorBase * unidades) + impuestos;
    }, 0);
  }
}