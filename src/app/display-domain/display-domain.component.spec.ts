import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDomainComponent } from './display-domain.component';

describe('DisplayDomainComponent', () => {
  let component: DisplayDomainComponent;
  let fixture: ComponentFixture<DisplayDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
