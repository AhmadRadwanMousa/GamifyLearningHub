import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlanComponent } from './manage-plan.component';

describe('ManagePlanComponent', () => {
  let component: ManagePlanComponent;
  let fixture: ComponentFixture<ManagePlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePlanComponent]
    });
    fixture = TestBed.createComponent(ManagePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
