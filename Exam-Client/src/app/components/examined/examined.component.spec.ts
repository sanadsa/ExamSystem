import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminedComponent } from './examined.component';

describe('ExaminedComponent', () => {
  let component: ExaminedComponent;
  let fixture: ComponentFixture<ExaminedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
