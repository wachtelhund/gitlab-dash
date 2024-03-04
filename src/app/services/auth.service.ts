import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private ssrCookieService: SsrCookieService) {
    this.loggedIn.next(this.ssrCookieService.get('signedin') === 'true');
   }

    login() {
        this.ssrCookieService.set('signedin', 'true');
    }

    logout() {
        this.ssrCookieService.delete('signedin');
    }
}
