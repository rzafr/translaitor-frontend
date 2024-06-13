import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-translation-update-modal',
  templateUrl: './translation-update-modal.component.html',
  styleUrls: ['./translation-update-modal.component.css']
})
export class TranslationUpdateModalComponent {

  @Input() translation = {
    id: 0,
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
      roles: [] as string[]
    }
  };

  constructor(public activeModal: NgbActiveModal, private translationService: TranslationService) {}

  onSubmit(): void {
    this.translationService.updateTranslation(this.translation).subscribe({
      next: (data: any) => {
        this.activeModal.close(data); // Returns updated data
      },
      error: (error: any) => {
      }
    });
  }

  onCancel(): void {
    this.activeModal.dismiss('cancel');
  }

  toggleFavorite(event: any) {
    if (event.target) {
      const checked = (event.target as HTMLInputElement).checked;
      this.translation.favorite = checked;
    }
  }

}
