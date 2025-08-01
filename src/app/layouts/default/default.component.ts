import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersService } from '../../services/users/users.service';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        RouterOutlet,
        RouterModule,
        MatButtonModule
    ]
})
export class DefaultComponent {
  @ViewChild(RouterOutlet) outlet: RouterOutlet | undefined;
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  public isExpanded: boolean;

  constructor(private authService: UsersService, private router: Router) {
    this.isExpanded = true;
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then();
  }

  openProfile() {
    console.log('Abrir perfil');
    this.router.navigate(['/monitors/profile']);
  }

  openSettings() {
    console.log('Abrir configuración');
    this.router.navigate(['/monitors/config']);
  }
}
