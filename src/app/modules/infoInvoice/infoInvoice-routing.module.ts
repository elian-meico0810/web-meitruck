import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebInfoInvoiceComponent } from './pages/webInfoInvoice.component';

const routes: Routes = [
  {
    path: '',
    component: WebInfoInvoiceComponent,
    canActivate: [],
    data: { requiredPermission: '0001' }
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InfoInvoiceRoutingModule { }
