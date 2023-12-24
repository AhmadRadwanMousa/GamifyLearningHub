import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsturctorContainerComponent } from './insturctor-container.component';

describe('InsturctorContainerComponent', () => {
  let component: InsturctorContainerComponent;
  let fixture: ComponentFixture<InsturctorContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsturctorContainerComponent]
    });
    fixture = TestBed.createComponent(InsturctorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
