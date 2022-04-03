import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  registerUserUrl = 'http://localhost:5080/UserManagement/UserRegister/';
  loginUserUrl = 'http://localhost:5080/UserManagement/UserLogin/';

  constructor(private http: HttpClient) {}

  registerUser(data: any) {
    return this.http.post(this.registerUserUrl, data);
  }
  loginUser(data:any){
    return this.http.post(this.loginUserUrl, data);
  }
}
