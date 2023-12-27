import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserStatusComponent } from './manage-user-status.component';

describe('ManageUserStatusComponent', () => {
  let component: ManageUserStatusComponent;
  let fixture: ComponentFixture<ManageUserStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUserStatusComponent]
    });
    fixture = TestBed.createComponent(ManageUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
