import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationUpdateModalComponent } from './translation-update-modal.component';

describe('TranslationUpdateModalComponent', () => {
  let component: TranslationUpdateModalComponent;
  let fixture: ComponentFixture<TranslationUpdateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationUpdateModalComponent]
    });
    fixture = TestBed.createComponent(TranslationUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
