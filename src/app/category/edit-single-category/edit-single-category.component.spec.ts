import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingleCategoryComponent } from './edit-single-category.component';

describe('EditSingleCategoryComponent', () => {
  let component: EditSingleCategoryComponent;
  let fixture: ComponentFixture<EditSingleCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSingleCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSingleCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
