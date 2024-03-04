import { Injectable, Output } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Authentication service
 */
export class AuthService {
  @Output() loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private ssrCookieService: SsrCookieService) {
    this.loggedIn.next(this.ssrCookieService.get('signedin') === 'true');
   }

   /**
    * Set the signed in cookie
    */
    login() {
        this.ssrCookieService.set('signedin', 'true');
    }

    /**
     * Delete the signed in cookie
     */
    logout() {
        this.ssrCookieService.delete('signedin');
    }
}
