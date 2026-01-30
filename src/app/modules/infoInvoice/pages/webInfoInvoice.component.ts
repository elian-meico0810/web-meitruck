import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-web-info-invoice',
  templateUrl: './webInfoInvoice.component.html',
  styleUrls: ['./webInfoInvoice.component.css'],
    imports: [CommonModule] 

})
export class WebInfoInvoiceComponent implements OnInit {
  activeTab: 'delivered' | 'rejected' = 'delivered';
  constructor() { }

  ngOnInit(): void {
  }
  data = {
    delivered: [
      { units: 30, name: 'Cerveza Miller Lite Botella 330 ml', subtotal: 75000 },
      { units: 20, name: 'Jabón desengrasante para vajilla Axion 250 ml', subtotal: 44000 },
      { units: 37, name: 'Jabón para ropa Suavitel Complete 700 ml', subtotal: 85100 },
      { units: 42, name: 'Licor de Agave San Luis 750 ml', subtotal: 357000 },
      { units: 42, name: 'Licor de Agave San Luis 750 ml', subtotal: 357000 },
      { units: 42, name: 'Licor de Agave San Luis 750 ml', subtotal: 357000 },
      { units: 42, name: 'Licor de Agave San Luis 750 ml', subtotal: 357000 },
      { units: 42, name: 'Licor de Agave San Luis 750 ml', subtotal: 357000 },
      { units: 42, name: 'Licor de Agave San Luis 750 ml', subtotal: 357000 },
      { units: 42, name: 'Licor de Agave San Luis 750 ml', subtotal: 357000 },
      { units: 42, name: 'Licor de Agave San Luis 750 ml', subtotal: 357000 },
      { units: 42, name: 'Licor de Agave San Luis 750 ml', subtotal: 357000 }
    ],

    rejected: [
      { units: 5, name: 'Gaseosa Coca-Cola Original 1.5 L', subtotal: 12000 }
    ],

    summary: {
      orderNumber: '58760',
      invoiceNumber: '12345678901',
      subtotal: 712100,
      financialDiscount: -1500,
      rejectedProducts: -151000,
      totalPaid: 559600,
      payments: [
        { method: 'Efectivo', amount: 250600 },
        { method: 'Otos', amount: 309000 },
        { method: 'Transferencia', amount: 309000 }
      ]
    }
  };


  get products() {
    return this.data[this.activeTab];
  }
  // Método para cambiar pestaña
  setActiveTab(tab: 'delivered' | 'rejected'): void {
    console.log('Cambiando pestaña a:', tab);
    this.activeTab = tab;
  }

}