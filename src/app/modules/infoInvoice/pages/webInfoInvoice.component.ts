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

  pedidoData: PedidoData | null = null;
  dataPayment: DataPayment[] = [];
  pedidosDetalleData: PedidoDetalleData[] = [];

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
            this.pedidoData = res.data.pedidos_data;
            this.dataPayment = res.data.data_payment;
            this.pedidosDetalleData = res.data.pedidos_detalle_data;
            this.calcularTotalPaid();
            this.calcularTotalRefuesd();
            this.subtotalAll();
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
    return this.pedidosDetalleData
      .filter(item =>
        (item.unidades_rechazadas ?? 0) > 0
      )
      .map(item => ({
        units: item.unidades_rechazadas ?? 0,
        code: item.codigo_producto?.trim(),
        name: item.nombre_producto?.trim(),
        subtotal:
          (item.valor_base_producto ?? 0) *
          (item.unidades_rechazadas ?? 0) +
          (item.total_impuestos ?? 0)
      }));
  }

  get delivered() {
    return this.pedidosDetalleData
      .filter(item =>
        (item.unidades_rechazadas ?? 0) <
        (item.unidades_solicitadas ?? 0)
      )
      .map(item => ({
        units: item.unidades_entregadas ?? 0,
        code: item.codigo_producto?.trim(),
        name: item.nombre_producto?.trim(),
        subtotal:
          (item.valor_base_producto ?? 0) *
          (item.unidades_entregadas ?? 0) +
          (item.total_impuestos ?? 0)
      }));
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
      financialDiscount: 0,
      rejectedProducts: 0,
      totalPaid,
      payments: groupedPayments
    };
  }

  subtotalAll() {
    const subtotalAll = this.pedidosDetalleData.reduce(
      (total, item) =>
        total +
        ((item.valor_base_producto ?? 0) * (item.unidades_entregadas ?? 0)) +
        (item.total_impuestos ?? 0),
      0
    );

    return subtotalAll;
  }



  // Total pagado
  getTotalPaid(): number {
    return this.dataPayment.reduce((total, pago) => {
      return total + parseFloat(pago.valor);
    }, 0);
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