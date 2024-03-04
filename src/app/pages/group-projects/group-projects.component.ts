import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLGroup } from '../../types/user/groupStruct';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-group-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './group-projects.component.html',
  styleUrl: './group-projects.component.scss'
})
export class GroupProjectsComponent {
  displayedColumns: string[] = ['project', 'lastCommit', 'avatar'];
  groups: GLGroup[] = [];
  constructor(private userService: UserService) {
    this.get();
  }

  get() {
    this.userService.getGroupProjects().subscribe((res) => {
      console.log(res.data.currentUser);
      
      this.groups = res.data.currentUser.groups.nodes;
    });
  }


}
