import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextOfKinPage } from './next-of-kin.page';

describe('NextOfKinPage', () => {
  let component: NextOfKinPage;
  let fixture: ComponentFixture<NextOfKinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextOfKinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextOfKinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
