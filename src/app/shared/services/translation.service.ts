import { HttpClient, HttpParams } from '@angular/common/http';
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

  // Returns all translations by user, paged and sorted
  getTranslationsByUserPagedAndSorted(page: number, size: number, sortBy: string = 'createdAt,desc'): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortBy);
    return this.http.get(`${this.apiUrl}/translations/user/paged-sorted`, { params });
  }

  // Returns all favorite translations by user
  getFavoriteTranslationsByUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/translations/user/favorite`);
  }

  // Update translation
  updateTranslation(translation: Translation): Observable<any> {
    return this.http.put(`${this.apiUrl}/translations`, translation);
  }

  // Delete translation by ID
  deleteTranslationById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/translations/${id}`);
  }

}
