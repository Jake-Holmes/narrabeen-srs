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
  ) {
    this.authInfo = new AuthInfo();
  }

  public async login(user: string, password: string): Promise<Boolean> {

    let formData: FormData = new FormData();
    formData.append('username', user);
    formData.append('authType', 'secret');
    formData.append('clientSecret', password);

    try {
      this.authInfo = await this.loginRequest(formData);
      console.log(this.authInfo.sessionId);
      return true;
    } catch(err) {
      return false;
    }
  }

  public async authguard(): Promise<Boolean> {
    if (this.authInfo.uuid.length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  public clearAuth() {
    this.authInfo = new AuthInfo();
  }

  private async loginRequest(formData: FormData): Promise<AuthInfo> {
    return this.http.post<AuthInfo>('https://jakeholmes.me:5001/vaultish/vauth/v0/login', formData).toPromise();
  }
}
