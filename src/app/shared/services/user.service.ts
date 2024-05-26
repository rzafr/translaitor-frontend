import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  // Create a new user
  register(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/auth/register`, formValue);
  }

  // Returns all users
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`);
  }

}
