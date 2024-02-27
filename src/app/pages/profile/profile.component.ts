import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, afterNextRender } from '@angular/core';
import env from '../../../../env.json'
import { Router } from '@angular/router';
// import { CodeChallange } from '../../../helpers/crypto/CodeChallenge';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule],
  providers: [HttpClient],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  url!: string;
  constructor (private http: HttpClient, private router: Router) {
    const paramaters = {
        client_id: env.AUTH.OAUTH_APPLICATION_ID,
        state: 'STATE',
        scope: 'api',
        response_type: 'code',
        redirect_uri: `http://localhost:4000/api/auth`,
      }
    
      const url = new URL('https://gitlab.lnu.se/oauth/authorize?')
      url.search = new URLSearchParams(paramaters as any).toString()
      this.url = url.toString();
    }
}
