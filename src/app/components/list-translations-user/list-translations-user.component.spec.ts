import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTranslationsUserComponent } from './list-translations-user.component';

describe('ListTranslationsUserComponent', () => {
  let component: ListTranslationsUserComponent;
  let fixture: ComponentFixture<ListTranslationsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTranslationsUserComponent]
    });
    fixture = TestBed.createComponent(ListTranslationsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
