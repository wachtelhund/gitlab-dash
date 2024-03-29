import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../types/user/profile';
import { Activity } from '../types/user/activity';
import { PagedRequest } from '../types/user/paged.request';
import { GLGroupsResponse } from '../types/user/groupStruct';

@Injectable({
  providedIn: 'root'
})
/**
 * User service
 */
export class UserService {
  url = '/api/user-data/profile';
  constructor(private http: HttpClient) {}

  /**
   * Get the profile
   */
  public getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.url.toString())
  }

  /**
   * Get the activities
   */
  public getActivities(req: PagedRequest): Observable<HttpResponse<Activity[]>> {
    return this.http.get<Activity[]>('/api/user-data/activities', {
      params: {
        page: req.page.toString(),
        per_page: req.per_page.toString()
      },
      observe: 'response'
    })
  }

  /**
   * Get the group projects
   */
  public getGroupProjects(): Observable<GLGroupsResponse> {
    return this.http.get<GLGroupsResponse>('/api/user-data/group-projects')
  }


}
