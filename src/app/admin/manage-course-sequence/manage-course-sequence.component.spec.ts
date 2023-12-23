import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCourseSequenceComponent } from './manage-course-sequence.component';

describe('ManageCourseSequenceComponent', () => {
  let component: ManageCourseSequenceComponent;
  let fixture: ComponentFixture<ManageCourseSequenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCourseSequenceComponent]
    });
    fixture = TestBed.createComponent(ManageCourseSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
