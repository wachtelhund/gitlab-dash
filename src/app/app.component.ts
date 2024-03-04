import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  providers: [HttpClient, SsrCookieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GitLab LNU';
  url!: string;
  router = inject(Router);
  cookieService = inject(SsrCookieService);
  authService = inject(AuthService);

  constructor(private http: HttpClient) {
  }
}
