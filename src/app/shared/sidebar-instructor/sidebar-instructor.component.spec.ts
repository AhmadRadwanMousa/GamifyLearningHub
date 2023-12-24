import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarInstructorComponent } from './sidebar-instructor.component';

describe('SidebarInstructorComponent', () => {
  let component: SidebarInstructorComponent;
  let fixture: ComponentFixture<SidebarInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarInstructorComponent]
    });
    fixture = TestBed.createComponent(SidebarInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
