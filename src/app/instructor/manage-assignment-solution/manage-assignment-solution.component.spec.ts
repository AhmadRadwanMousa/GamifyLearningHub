import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssignmentSolutionComponent } from './manage-assignment-solution.component';

describe('ManageAssignmentSolutionComponent', () => {
  let component: ManageAssignmentSolutionComponent;
  let fixture: ComponentFixture<ManageAssignmentSolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAssignmentSolutionComponent]
    });
    fixture = TestBed.createComponent(ManageAssignmentSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
