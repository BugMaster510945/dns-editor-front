import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesDetailComponent } from './zones-detail.component';

describe('ZonesDetailComponent', () => {
  let component: ZonesDetailComponent;
  let fixture: ComponentFixture<ZonesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
