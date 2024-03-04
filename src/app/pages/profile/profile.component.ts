import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Profile } from '../../types/user/profile';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule, DatePipe],
  providers: [HttpClient, UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
/**
 * Profile component
 */
export class ProfileComponent {
  profile!: Profile;
  lastActivityOn!: Date;
  constructor (private userService: UserService) {
      this.get();
  }

  /**
   * Get the profile and last activity
   */
  get() {
    this.userService.getProfile().subscribe((data) => {
      this.profile = data;
    });
    this.userService.getActivities({page: 1, per_page: 1}).subscribe((data) => {
      this.lastActivityOn = data.body[0].created_at;
    });
  }
}
