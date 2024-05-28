import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Returns all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);// No pide autorización
  }

}
