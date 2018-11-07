import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthInfo } from './auth-info';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authInfo: AuthInfo;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(user: String, password: String) {

    let formData:FormData = new FormData();  
    formData.append('username','narrabeen-admin');  
    formData.append('authType', 'secret');  
    formData.append('clientSecret','password123');   

    this.http.post<AuthInfo>('https://jakeholmes.me:5001/vaultish/vauth/v0/login',formData)
      .subscribe(
        data => {
          this.authInfo = <AuthInfo>{};
          this.authInfo.expiry = data.expiry.toString();
          this.authInfo.sessionId = data.sessionId.toString();
          this.authInfo.uuid = data.uuid.toString();
        },
        error => {
          var s = "String";
        }
      );
  }
}
