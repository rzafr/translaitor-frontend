import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080/api';

  isLoggedIn = false;

  constructor(private httpClient: HttpClient) { }

  // Create a new user
  register(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/auth/register`, formValue);
  }

  // Get user and token from backend
  login(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/auth/login`, formValue);
  }

  // Save the token coming from the backend in localstorage
  public loginUser(token: any) {
    localStorage.setItem('accessToken', token);
  }

  // Leave the localstorage empty
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    return true;
  }

  // Convert user object to json and save it to localstorage
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // If it exists, it returns the user json as an object
  getUser() {
    let userStr = localStorage.getItem('user')
    if (userStr) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // Returns the user's role
  getUserRole() {
    return this.getUser().roles[0];
  }

  // Returns the session user
  getCurrentUser() {
    return this.httpClient.get(`${this.baseUrl}/user/me`);
  }

}
