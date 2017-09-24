import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesEntryEditComponent } from './zones-entry-edit.component';

describe('ZonesEntryEditComponent', () => {
  let component: ZonesEntryEditComponent;
  let fixture: ComponentFixture<ZonesEntryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonesEntryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
