import { Component, afterNextRender, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { HyperButton } from './types/ui/HyperButton';
import env from '../../env.json';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { HttpClient } from '@angular/common/http';
import { router } from '../api/routes/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  providers: [HttpClient, SsrCookieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Testing Angular SSR';
  url!: string;
  router = inject(Router);
  cookieService = inject(SsrCookieService);
  loggedInButtons: HyperButton[] = [
    { text: 'Home', href: '/' },
    { text: 'Profile', href: '/profile' },
    { text: 'Activities', href: '/activities' },
    { text: 'Group projects', href: '/group-projects' },
    { text: 'Logout', href: '/', sideEffect: () => {
      this.http.post(env.BASE_URL + '/api/auth/logout', {
        credentials: 'include',
      }).subscribe(() => {
        this.renderHeader();
      });
    }},
  ];


  loggedOutButtons: HyperButton[] = [
    { text: 'Home', href: '/' },
  ];

  buttons: HyperButton[] = this.loggedOutButtons;

  constructor(private http: HttpClient) {
    const paramaters = {
        client_id: env.AUTH.OAUTH_APPLICATION_ID,
        state: env.AUTH.STATE,
        scope: env.AUTH.SCOPE,
        response_type: env.AUTH.RESPONSE_TYPE,
        redirect_uri: env.AUTH.REDIRECT_URI,
      }
    
      const url = new URL('https://gitlab.lnu.se/oauth/authorize?')
      url.search = new URLSearchParams(paramaters as any).toString()
      this.url = url.toString();

      this.loggedOutButtons.push({ text: 'Login', href: this.url, external: true });
      this.renderHeader();
  }

  renderHeader() {
    console.log('rendering header');
    
    this.cookieService.get('signedin') === 'true' ? this.buttons = this.loggedInButtons : this.buttons = this.loggedOutButtons;
  }
}
