import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLGroup } from '../../types/user/groupStruct';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-group-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './group-projects.component.html',
  styleUrl: './group-projects.component.scss'
})
/**
 * Group projects component
 */
export class GroupProjectsComponent {
  displayedColumns: string[] = ['project-avatar', 'project', 'lastCommit', 'avatar'];
  groups: GLGroup[] = [];
  hasMoreGroups: boolean | undefined = false;

  constructor(private userService: UserService) {
    this.get();
  }

  /**
   * Get the group projects
   */
  get() {
    this.userService.getGroupProjects().subscribe((res) => {
      this.groups = res.data.currentUser.groups.nodes.slice(0, 3);
      for (const group of this.groups) {
        if (group.projects.nodes.length > 5) {
          group.projects.nodes = group.projects.nodes.slice(0, 5);
        }
      }
      this.hasMoreGroups = res.data.currentUser.groups.hasMore;
    });
  }

  loadMoreGroups () {
    throw new Error('Not implemented');
  }
}
