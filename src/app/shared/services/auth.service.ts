import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.authUrl;

  public isLoggedIn = false;

  constructor(private http: HttpClient) { }

  // Persist a new user
  register(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }

  // Get user and token from backend
  login(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, user);
  }

  // Save the token coming from the backend in localstorage
  loginUser(token: any) {
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
    return this.getUser().roles[0].toLowerCase();
  }

  // Returns the session user
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.authUrl}/user/me`);
  }

  isAdmin() {
    return this.getUserRole() == 'admin';
  }

  isUser() {
    return this.getUserRole() == 'user';
  }

}
