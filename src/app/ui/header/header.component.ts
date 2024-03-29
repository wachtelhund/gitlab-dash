import { Component, Input, OnInit, signal } from '@angular/core';
import { HyperButton } from '../../types/ui/HyperButton';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
/**
 * Header component
 */
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  buttons = signal<HyperButton[]>([]);

  loggedInButtons: HyperButton[] = [
    { text: 'Home', href: '/' },
    { text: 'Profile', href: '/profile' },
    { text: 'Activities', href: '/activities' },
    { text: 'Group projects', href: '/group-project' },
    { text: 'Logout', href: '/', sideEffect: () => {
      this.http.post('/api/auth/logout', {
        credentials: 'include',
      }).subscribe(() => {
        this.authService.logout();
        this.buttons.set(this.loggedOutButtons);
      });
    }},
  ];


  loggedOutButtons: HyperButton[] = [
    { text: 'Home', href: '/' },
  ];

  constructor(private authService: AuthService, private http: HttpClient) {
    this.title = 'LNU WT1';
    const paramaters = {
        client_id: environment.AUTH.OAUTH_APPLICATION_ID,
        state: environment.AUTH.STATE,
        scope: environment.AUTH.SCOPE,
        response_type: environment.AUTH.RESPONSE_TYPE,
        redirect_uri: environment.AUTH.REDIRECT_URI,
      }
    
      const url = new URL('https://gitlab.lnu.se/oauth/authorize?')
      url.search = new URLSearchParams(paramaters as OAuthParamaters).toString()

      this.loggedOutButtons.push({ text: 'Login', href: url.toString(), external: true, sideEffect: () => {
        this.login();
      }});
      this.buttons.set(this.loggedOutButtons);
  }

  ngOnInit() {
    this.authService.loggedIn.subscribe((loggedIn) => {
      this.buttons.set(loggedIn ? this.loggedInButtons : this.loggedOutButtons);
    });
  }

  /**
   * Login
   */
  login() {
    this.authService.login();
  }

}

type OAuthParamaters = {
    client_id: string,
    state: string,
    scope: string,
    response_type: string,
    redirect_uri: string,
}
