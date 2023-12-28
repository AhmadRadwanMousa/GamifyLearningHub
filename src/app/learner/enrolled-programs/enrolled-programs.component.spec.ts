import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledProgramsComponent } from './enrolled-programs.component';

describe('EnrolledProgramsComponent', () => {
  let component: EnrolledProgramsComponent;
  let fixture: ComponentFixture<EnrolledProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrolledProgramsComponent]
    });
    fixture = TestBed.createComponent(EnrolledProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
