import { Component, Input, afterNextRender, inject } from '@angular/core';
import { HyperButton } from '../../types/ui/HyperButton';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() buttons!: HyperButton[];

  constructor() {
    this.title = 'testing_ssr';
  }

}
