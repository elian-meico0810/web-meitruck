import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { UsuariosComponent } from './usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { GuiasComponent } from '../guias/guias.component';
import { WebInfoInvoiceComponent } from '../infoInvoice/pages/webInfoInvoice.component';

const routes: Routes = [
    {
        path: '',
        component: UsuariosComponent,
        canActivate: [AuthGuard],
        data: { requiredPermission: '0001' }
    },
    {
        path: 'guias',
        component: GuiasComponent,
        canActivate: [AuthGuard],
        data: { requiredPermission: '0001' },
    },
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule, RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
