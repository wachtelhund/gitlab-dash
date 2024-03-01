import { HttpClient } from '@angular/common/http';
import { Component, WritableSignal, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Activity } from '../../types/user/activity';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, CommonModule, DatePipe],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  // activities: AbortSignal(Activity[] = [];
  // activities = signal<Activity[]>([]);
  activities = new MatTableDataSource<Activity>();
  length = 200;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;

  pageEvent!: PageEvent;

  displayedColumns: string[] = ['action_name', 'created_at', 'target_title', 'target_type'];
  constructor(private userService: UserService) {
    
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.userService.getActivities({page: this.pageIndex + 1, per_page: this.pageSize}).subscribe((data) => {
      this.activities = new MatTableDataSource(data.body);
      this.length = data.headers.get('X-Total-Count');
      const totalCountHeader = data.headers.get('X-Total-Count');
      this.length = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    
    this.get();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
