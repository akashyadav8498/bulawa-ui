import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DesignerComponent } from './pages/designer/designer.component';
import { DashboardComponent } from './pages/designer/dashboard.component';
import { DesignsComponent } from './pages/designer/designs.component';
import { NewDesignComponent } from './pages/designer/new-design.component';
import { StudioComponent } from './pages/designer/studio/studio.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { AdminComponent } from './pages/admin/admin.component';
import { InviteComponent } from './pages/invite/invite.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { authGuard, roleGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { 
    path: 'designer', 
    component: DesignerComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_DESIGNER' },
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'designs', component: DesignsComponent },
      { path: 'designs/new', component: NewDesignComponent }
    ]
  },
  { 
    path: 'designer/studio/:id', 
    component: StudioComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_DESIGNER' }
  },
  { 
    path: 'customer', 
    component: CustomerComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_CUSTOMER' } 
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_SUPER_ADMIN' }
  },
  { path: 'invite/:slug', component: InviteComponent }
];
