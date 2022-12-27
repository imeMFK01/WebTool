import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionFactorComponent } from './protection-factor.component';

describe('ProtectionFactorComponent', () => {
  let component: ProtectionFactorComponent;
  let fixture: ComponentFixture<ProtectionFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectionFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectionFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
