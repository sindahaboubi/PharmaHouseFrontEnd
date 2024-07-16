import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMedicamentsComponent } from './dashboard-medicaments.component';

describe('DashboardMedicamentsComponent', () => {
  let component: DashboardMedicamentsComponent;
  let fixture: ComponentFixture<DashboardMedicamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMedicamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMedicamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
