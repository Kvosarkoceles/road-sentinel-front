import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { isLoggedGuard } from './middlewares/is.logged.guard';
import { isNotLoggedGuard } from './middlewares/is.not.logged.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { TicketAllComponent } from './views/ticket-all/ticket-all.component';
import { TicketFormComponent } from './components/ticket/ticket-form/ticket-form.component';
import { TicketUpdateComponent } from './components/ticket/ticket-update/ticket-update.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [isNotLoggedGuard],
  },
  {
    path: 'solicitudes',
    component: DefaultComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: '',
        component: TicketAllComponent,
      },
      {
        path: 'nuevo',
        component: TicketFormComponent,
      },
      {
        path: 'editar/:id',
        component: TicketUpdateComponent,
      }
    ],
  }
];

export const routing = provideRouter(routes);