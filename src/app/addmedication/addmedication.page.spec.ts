import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedicationPage } from './addmedication.page';

describe('AddmedicationPage', () => {
  let component: AddmedicationPage;
  let fixture: ComponentFixture<AddmedicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmedicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmedicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
