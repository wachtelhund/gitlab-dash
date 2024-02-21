import { Routes } from '@angular/router';
import path from 'node:path';
import env from '../../env.json'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
