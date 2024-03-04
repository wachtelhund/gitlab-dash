import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'activities',
        loadComponent: () => import('./pages/activity/activity.component').then(m => m.ActivityComponent),
        canActivate: [authGuard]
    },
    {
        path: 'group-project',
        loadComponent: () => import('./pages/group-projects/group-projects.component').then(m => m.GroupProjectsComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
