import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerExamComponent } from './learner-exam.component';

describe('LearnerExamComponent', () => {
  let component: LearnerExamComponent;
  let fixture: ComponentFixture<LearnerExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerExamComponent]
    });
    fixture = TestBed.createComponent(LearnerExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
