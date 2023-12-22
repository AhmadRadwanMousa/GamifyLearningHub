import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsPlanComponent } from './programs-plan.component';

describe('ProgramsPlanComponent', () => {
  let component: ProgramsPlanComponent;
  let fixture: ComponentFixture<ProgramsPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramsPlanComponent]
    });
    fixture = TestBed.createComponent(ProgramsPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
