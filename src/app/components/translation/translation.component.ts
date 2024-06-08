import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OpenaiService } from 'src/app/shared/services/openai.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

  public messages: any[] = [];

  public translation = {
    sourceLanguage: '',
    targetLanguage: '',
    originalText: '',
    translatedText: '',
    favorite: false,
    user: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
      email: '',
      phoneNumber: '',
      roles: []
    }
  }

  constructor(private openaiService: OpenaiService, private translationService: TranslationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (data: any) => {
        this.translation.user = data;
      },
      error: (error: any) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

  onSubmit() {
    if (this.translation.sourceLanguage && this.translation.originalText && this.translation.targetLanguage) {
      const prompt = `Translate the following text into ${this.translation.targetLanguage}, respond only with the translated text: ${this.translation.originalText}`;
      const userMessage = { role: 'user', content: prompt };

      console.log(userMessage);

      this.messages.push(userMessage);

      this.openaiService.sendTranslation(this.messages).subscribe({
        next: (data: any) => {
          const gptMessage = data.choices[0].message;
          this.messages.push(gptMessage);
          this.translation.translatedText = gptMessage.content;
          console.log(gptMessage);

          this.translationService.saveTranslation(this.translation).subscribe({
            next: (data: any) => {
              // Navigate
            },
            error: (error: any) => {
              console.error('Translation persistence error', error);
            },
            complete: () => {
              console.log('Translation persistence completed');
            }
          });
        },
        error: (error: any) => {
          console.error('Translation persistence error', error);
        },
        complete: () => {
          console.log('Translation persistence completed');
        }
      });
    } else {
      console.log("Invalid form");
    }
  }

}
