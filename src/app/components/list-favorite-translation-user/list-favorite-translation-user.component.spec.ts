import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavoriteTranslationUserComponent } from './list-favorite-translation-user.component';

describe('ListFavoriteTranslationUserComponent', () => {
  let component: ListFavoriteTranslationUserComponent;
  let fixture: ComponentFixture<ListFavoriteTranslationUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFavoriteTranslationUserComponent]
    });
    fixture = TestBed.createComponent(ListFavoriteTranslationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
