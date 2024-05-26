import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  // Get user and token from backend
  login(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/auth/login`, formValue);
  }

  public loginUser(token: any) {
    localStorage.setItem('accessToken', token);
  }

  // Check if the user is logged in
  isLoggedIn() {
    if (localStorage.getItem('accessToken') == undefined || localStorage.getItem('accessToken') == null)
      return false;
    else
      return true;
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    return true;
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    let userStr = localStorage.getItem('user')
    if (userStr) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  getUserRole() {
    return this.getUser().roles[0];
  }

  getCurrentUser() {
    return this.httpClient.get(`${this.baseUrl}/user/me`);
  }
}
