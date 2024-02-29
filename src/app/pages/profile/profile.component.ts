import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, afterNextRender } from '@angular/core';
import env from '../../../../env.json'
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Profile } from '../../types/user/profile';
import { CommonModule } from '@angular/common';
// import { CodeChallange } from '../../../helpers/crypto/CodeChallenge';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [HttpClient, UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile!: Profile;
  constructor (private userService: UserService) {
      this.get();
    }

    get() {
      this.userService.getProfile().subscribe((data) => {
        this.profile = data;
      });
    }
}
