import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrustrationComponent } from './frustration.component';

describe('FrustrationComponent', () => {
  let component: FrustrationComponent;
  let fixture: ComponentFixture<FrustrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrustrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
