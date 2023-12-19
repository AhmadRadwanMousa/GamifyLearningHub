import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEducationPeriodComponent } from './manage-education-period.component';

describe('ManageEducationPeriodComponent', () => {
  let component: ManageEducationPeriodComponent;
  let fixture: ComponentFixture<ManageEducationPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEducationPeriodComponent]
    });
    fixture = TestBed.createComponent(ManageEducationPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
