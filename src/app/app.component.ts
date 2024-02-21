import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { HyperButton } from './types/ui/HyperButton';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Testing Angular SSR';
  loggedInButtons: HyperButton[] = [
    { text: 'Home', href: '/' },
    { text: 'Profile', href: '/profile' },
    { text: 'Activities', href: '/activities' },
    { text: 'Group projects', href: '/group-projects' },
  ];

  loggedOutButtons: HyperButton[] = [
    { text: 'Home', href: '/' },
    { text: 'Login', href: '/login' },
  ];

  buttons: HyperButton[] = this.loggedInButtons;



}
