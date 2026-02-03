import { Component, OnInit, inject } from '@angular/core';
import { MenuService } from '@core/components/sidebar/services/loadmenu.service';
import { AppStore, User } from '../../store/app.store';
import { environment } from 'src/environments/enviroments';
import { LoginService } from 'src/app/modules/seguridad/pages/login/services/login-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public modules: any[] = [];
  public submenuOpen: { [key: string]: boolean } = {};
  readonly store = inject(AppStore);
  public userLogin: User = {
    email: JSON.parse(localStorage.getItem(`AuthUser${environment.idAplicacion}`) || '{}').Email || '',
    FirstName: JSON.parse(localStorage.getItem(`AuthUser${environment.idAplicacion}`) || '{}').Name || '',
    Permissions: JSON.parse(localStorage.getItem(`AuthUser${environment.idAplicacion}`) || '{}').JWT || '',
    userName: JSON.parse(localStorage.getItem(`AuthUser${environment.idAplicacion}`) || '{}').userName || '',
    Foto: '',
  };
  constructor(
    private loginService: LoginService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.menu$.subscribe(modules => {
      this.modules = modules;

    });
    this.menuService.loadMenu();
  }

  toggleSubmenu(moduleName: string) {
    this.submenuOpen[moduleName] = !this.submenuOpen[moduleName];
  }

  hasVisiblePages(module: any): boolean {
    return module.paginas.some((page: any) => page.paginaVisible);
  }
  Logout() {
    this.loginService.logout();
  }

  OnChangeAccount() {
    this.loginService.ChangeAccount();
  }

  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;

    // Cerrar todos los submenús cuando se contrae la barra
    if (this.sidebarCollapsed) {
      for (let module of this.modules) {
        this.submenuOpen[module.nombreModulo] = false;
      }
    }
  }
}
