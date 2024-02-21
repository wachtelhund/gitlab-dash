import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, afterNextRender } from '@angular/core';
import env from '../../../../env.json'
import { Router } from '@angular/router';
import { CodeChallange } from '../../../helpers/crypto/CodeChallenge';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule],
  providers: [HttpClient],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor (private http: HttpClient, private router: Router) {
    // afterNextRender(() => {
    //   // this.router.navigate(["http://gitlab.com/oauth/authorize"])
    //   // this.http.get("http://gitlab.com/oauth/authorize").subscribe((res) => {
    //   //   console.log(res);
        
    //   // })
    // })
    this.genCodeChallange()
  }

  genCodeChallange() {
    const challange = new CodeChallange()
    console.log(challange.getVerifier().toString());
    console.log(challange.getCodeChallange.toString());
    
    
    // const paramaters = {
    //   client_id: env.AUTH.OAUTH_APPLICATION_ID,
    //   state: 'STATE',
    //   scope: 'api',
    //   grant_type: 'authorization_code',
    //   redirect_uri: `http://localhost:4000/api/auth`,
      // code_verifier: codeChallange.getVerifier().toString()
    // }
    
    // const url = new URL('https://gitlab.lnu.se/oauth/authorize?')
    // url.search = new URLSearchParams(paramaters as any).toString()

  }


}
