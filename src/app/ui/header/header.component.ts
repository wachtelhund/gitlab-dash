import { Component, Input } from '@angular/core';
import { HyperButton } from '../../types/ui/HyperButton';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

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
