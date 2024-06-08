import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Translation } from '../models/translation.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Persist a new translation
  saveTranslation(translation: Translation): Observable<any> {
    return this.http.post(`${this.apiUrl}/translations`, translation);
  }

  // Returns all translations by user
  getTranslationsByUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/translations/user`);
  }

  // Update translation
  updateTranslation(translation: Translation): Observable<any> {
    return this.http.put(`${this.apiUrl}/translations`, translation);
  }

}
