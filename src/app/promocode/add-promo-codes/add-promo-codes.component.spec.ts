import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromoCodesComponent } from './add-promo-codes.component';

describe('AddPromoCodesComponent', () => {
  let component: AddPromoCodesComponent;
  let fixture: ComponentFixture<AddPromoCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPromoCodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPromoCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
