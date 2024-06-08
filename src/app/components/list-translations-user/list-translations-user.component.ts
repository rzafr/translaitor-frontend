import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Translation } from 'src/app/shared/models/translation.model';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { TranslationUpdateModalComponent } from '../translation-update-modal/translation-update-modal.component';

@Component({
  selector: 'app-list-translations-user',
  templateUrl: './list-translations-user.component.html',
  styleUrls: ['./list-translations-user.component.css']
})
export class ListTranslationsUserComponent implements OnInit {

  translations: Translation[] = [ ];

  constructor(private translationService: TranslationService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchAllTranslationsByUser();
  }

  fetchAllTranslationsByUser() {
    this.translationService.getTranslationsByUser().subscribe({
      next: (data: Translation[]) => {
        this.translations = data;
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      },
      complete: () => {
        console.log('User fetching completed');
      }
    });
  }

  openUpdateModal(translation: Translation) {
    const modalRef = this.modalService.open(TranslationUpdateModalComponent);
    modalRef.componentInstance.translation = { ...translation }; // Pass a copy of the translation to avoid unwanted changes

    modalRef.result.then((result) => {
      if (result) {
        this.translationService.updateTranslation(result).subscribe(updatedTranslation => {
          // Update the user list with the updated user
          const index = this.translations.findIndex(t => t.id === updatedTranslation.id);
          if (index !== -1) {
            this.translations[index] = updatedTranslation;
          }
        });
      }
    });
  }
  /*
  deleteTranslationById(id: any): void {
    if (confirm('Confirme la eliminación del usuario')) {
      this.userService.deleteUserById(id).subscribe({
        next: () => {
          this.fetchAllUsers();
        },
        error: (error: any) => {
          console.error('Error deleting user', error);
        },
        complete: () => {
          console.log('User deleting completed');
        }
      });
    }
  }
  */
}
