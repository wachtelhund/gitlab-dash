import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../../../env.json';
import { Observable } from 'rxjs';
import { Profile } from '../types/user/profile';
import { Activity } from '../types/user/activity';
import { PagedRequest } from '../types/user/paged.request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = env.BASE_URL + '/api/user-data/profile';
  constructor(private http: HttpClient) {}

  public getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.url.toString())
  }

  public getActivities(req: PagedRequest): Observable<any> {
    return this.http.get<Activity>(env.BASE_URL + '/api/user-data/activities', {
      params: {
        page: req.page.toString(),
        per_page: req.per_page.toString()
      },
      observe: 'response'
    })
  }
}
