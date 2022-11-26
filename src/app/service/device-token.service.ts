import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceTokenService {

  token: string = '';

  constructor() { }

  setDeviceToken(data: any) {
    console.log(`this.token  =>`, this.token)
    console.log(`data  =>`, data)
    this.token = data;
    console.log(`this.token  =>`, this.token)
  }

  getDeviceToken() {
    console.log(`this.token  =>`, this.token)
    return this.token
  }

}
