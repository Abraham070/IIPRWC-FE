import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingleProductComponent } from './edit-single-product.component';

describe('EditSingleProductComponent', () => {
  let component: EditSingleProductComponent;
  let fixture: ComponentFixture<EditSingleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSingleProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
