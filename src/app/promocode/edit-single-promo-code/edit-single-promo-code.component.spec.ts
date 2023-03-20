import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSinglePromoCodeComponent } from './edit-single-promo-code.component';

describe('EditSinglePromoCodeComponent', () => {
  let component: EditSinglePromoCodeComponent;
  let fixture: ComponentFixture<EditSinglePromoCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSinglePromoCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSinglePromoCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
