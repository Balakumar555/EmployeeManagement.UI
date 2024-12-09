import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditemployeeComponent } from './addoreditemployee.component';

describe('AddoreditemployeeComponent', () => {
  let component: AddoreditemployeeComponent;
  let fixture: ComponentFixture<AddoreditemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddoreditemployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddoreditemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
