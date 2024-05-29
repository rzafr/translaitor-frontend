import { Component } from '@angular/core';
import { OpenaiService } from 'src/app/shared/services/openai.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent {

  originalText: string = '';
  prompt: string = `Translate the following text into English, respond only with the translated text: ${this.originalText}`;
  translatedText: string = '';

  constructor(private openaiService: OpenaiService) {}

  onSubmit() {
    this.openaiService.sendTranslation(this.prompt).subscribe(response => {
      this.translatedText = response.choices[0].text;
    });
  }

}
