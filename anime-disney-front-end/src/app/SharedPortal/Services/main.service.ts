import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  registerUserUrl = 'http://localhost:5080/UserManagement/UserRegister/';
  loginUserUrl = 'http://localhost:5080/UserManagement/UserLogin/';
  getAllUsersUrl = 'http://localhost:5080/UserManagement/getAllUsers/';

  constructor(private http: HttpClient) {}

  registerUser(data: any) {
    return this.http.post(this.registerUserUrl, data);
  }
  loginUser(data:any){
    return this.http.post(this.loginUserUrl, data);
  }
  getAllUsers(){
    return this.http.get(this.getAllUsersUrl);
  }
  isLoggedIn() {
    return localStorage.getItem('userToken') != null;
  }
}
