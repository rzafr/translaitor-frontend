import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private openAiUrl = environment.openAiUrl;
  private openAiKey = environment.openAiKey;

  constructor(private http: HttpClient) { }

  sendTranslation(prompt: any): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.openAiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo-0125',
      prompt: prompt,
      temperature: 0,
      max_tokens: 1000,
      n: 1
    };

    return this.http.post<any>(this.openAiUrl, body, { headers });
  }

}
