import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableAuthService {

  private qrcode: string;

  constructor(
    private http: HttpClient,
  ) {
    this.qrcode = '';
  }

  public async login(tableId: string, passcode: string): Promise<Boolean> {
    try {
      this.qrcode = await this.loginRequest(tableId, passcode);
      console.log(this.qrcode);
      return true;
    } catch (err) {
      return false;
    }
  }

  private async loginRequest(id: string, passcode: string): Promise<string> {
    return this.http.get<string>('https://jakeholmes.me:5000/table/login?passcode=' + passcode + '&id=' + id).toPromise();
  }

  public returnQr(): string {
    return this.qrcode;
  }

  public returnQrUrl(): string {
    return 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=www.google.com'
  }
}
