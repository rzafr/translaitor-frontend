import { Component, OnInit } from '@angular/core';
import { Translation } from 'src/app/shared/models/translation.model';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-list-favorite-translation-user',
  templateUrl: './list-favorite-translation-user.component.html',
  styleUrls: ['./list-favorite-translation-user.component.css']
})
export class ListFavoriteTranslationUserComponent implements OnInit {

  favoriteTranslations: Translation[] = [];

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.getFavoriteTranslations();
  }

  getFavoriteTranslations() {
    this.translationService.getFavoriteTranslationsByUser().subscribe({
      next: (data: Translation[]) => {
        this.favoriteTranslations = data;
      },
      error: (error: any) => {
      }
    });
  }

}
