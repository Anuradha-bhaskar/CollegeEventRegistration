import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'admin-home',
    loadComponent: () => import('./admin-home/admin-home.component').then(m => m.AdminHomeComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'add',
    loadComponent: () => import('./add-event/add-event.component').then(m => m.AddEventComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'view',
    loadComponent: () => import('./view-events/view-events.component').then(m => m.ViewEventsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'my-registrations',
    loadComponent: () => import('./my-registrations/my-registrations.component').then(m => m.MyRegistrationsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'participants',
    loadComponent: () => import('./participants/participants.component').then(m => m.ParticipantsComponent),
    canActivate: [adminGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];