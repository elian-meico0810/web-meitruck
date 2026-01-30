import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { InfoInvoiceComponent } from './infoInvoice.component';
import { InfoInvoiceRoutingModule } from "./infoInvoice-routing.module";
import { WebInfoInvoiceComponent } from './pages/webInfoInvoice.component';


@NgModule({
  declarations: [
    InfoInvoiceComponent,
    WebInfoInvoiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfoInvoiceRoutingModule
  ],
})
export class InfoInvoiceModule { }
