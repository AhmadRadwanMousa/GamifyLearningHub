import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignmnetsComponent } from './user-assignmnets.component';

describe('UserAssignmnetsComponent', () => {
  let component: UserAssignmnetsComponent;
  let fixture: ComponentFixture<UserAssignmnetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAssignmnetsComponent]
    });
    fixture = TestBed.createComponent(UserAssignmnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
