import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorsTableComponent } from './tutors-table.component';

describe('TutorsTableComponent', () => {
  let component: TutorsTableComponent;
  let fixture: ComponentFixture<TutorsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
