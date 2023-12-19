import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlanDialogComponent } from './create-plan-dialog.component';

describe('CreatePlanDialogComponent', () => {
  let component: CreatePlanDialogComponent;
  let fixture: ComponentFixture<CreatePlanDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePlanDialogComponent]
    });
    fixture = TestBed.createComponent(CreatePlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
