import { Component } from '@angular/core';
import { OpenaiService } from 'src/app/shared/services/openai.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent {

  messages: any[] = [];
  originalText: string = '';
  prompt: string = `Translate the following text into English, respond only with the translated text: ${this.originalText}`;
  gptAnswer: string = '';

  constructor(private openaiService: OpenaiService) {}

  onSubmit() {
    const userMessage = { role: 'user', content: this.prompt };
    this.messages.push(userMessage);
    this.openaiService.sendTranslation(this.messages).subscribe(response => {
      const gptMessage = response.choices[0].message.content;
      this.messages.push(gptMessage);
      this.gptAnswer = gptMessage.content;
    });
    this.prompt = '';
  }

}
