import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../../../env.json';
import { Observable } from 'rxjs';
import { Profile } from '../types/user/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = env.BASE_URL + '/api/user-data/profile';
  constructor(private http: HttpClient) {}
  public getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.url.toString())
  }
}
