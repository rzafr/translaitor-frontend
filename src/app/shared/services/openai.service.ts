import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private openAiKey = environment.openAiKey;

  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: this.openAiKey,
      dangerouslyAllowBrowser: true
    });
  }

  sendTranslation(messages: any[]): Observable<any> {
    return new Observable(observer => {
      (async () => {
        try {
          const chatCompletion = await this.openai.chat.completions.create({
            messages: messages,
            model: 'gpt-3.5-turbo-0125',
            temperature: 0,
            max_tokens: 500,
            n: 1
          });
          observer.next(chatCompletion);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }

}
