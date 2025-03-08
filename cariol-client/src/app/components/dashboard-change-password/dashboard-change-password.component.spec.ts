import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChangePasswordComponent } from './dashboard-change-password.component';

describe('DashboradChangePasswordComponent', () => {
  let component: DashboardChangePasswordComponent;
  let fixture: ComponentFixture<DashboardChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardChangePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
