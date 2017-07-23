import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayZoneComponent } from './display-zone.component';

describe('DisplayZoneComponent', () => {
  let component: DisplayZoneComponent;
  let fixture: ComponentFixture<DisplayZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
