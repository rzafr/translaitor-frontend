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

  translations: Translation[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  totalItems: number = 0;

  constructor(private translationService: TranslationService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getTranslationsPagedAndSorted();
  }

  getAllTranslationsByUser() {
    this.translationService.getTranslationsByUser().subscribe({
      next: (data: Translation[]) => {
        this.translations = data;
      },
      error: (error: any) => {
      }
    });
  }

  getTranslationsPagedAndSorted(): void {
    this.translationService.getTranslationsByUserPagedAndSorted(this.currentPage, this.pageSize)
      .subscribe({
        next: (data: any) => {
          this.translations = data.translations;
          this.currentPage = data.currentPage;
          this.totalItems = data.totalItems;
          this.totalPages = data.totalPages;
        },
        error: (error: any) => {
        }
      });
  }

  setPage(page: number, event: Event): void {
    event.preventDefault();
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getTranslationsPagedAndSorted();
    }
  }

  sortData(sortBy: string): void {
    this.translationService.getTranslationsByUserPagedAndSorted(this.currentPage, this.pageSize, sortBy)
      .subscribe({
        next: (data: any) => {
          this.translations = data.translations;
          this.currentPage = data.currentPage;
          this.totalItems = data.totalItems;
          this.totalPages = data.totalPages;
        },
        error: (error: any) => {
        }
      });
  }

  openUpdateModal(translation: Translation) {
    const modalRef = this.modalService.open(TranslationUpdateModalComponent);
    modalRef.componentInstance.translation = { ...translation }; // Pass a copy of the translation to avoid unwanted changes

    modalRef.result.then((result) => {
      if (result) {
        this.translationService.updateTranslation(result).subscribe(updatedTranslation => {
          // Update the translations list with the updated translation
          const index = this.translations.findIndex(t => t.id === updatedTranslation.id);
          if (index !== -1) {
            this.translations[index] = updatedTranslation;
          }
        });
      }
    });
  }

  deleteTranslationById(id: any): void {
    if (confirm('Confirme la eliminación de la traducción')) {
      this.translationService.deleteTranslationById(id).subscribe({
        next: () => {
          this.getTranslationsPagedAndSorted();
        },
        error: (error: any) => {
        }
      });
    }
  }

}
