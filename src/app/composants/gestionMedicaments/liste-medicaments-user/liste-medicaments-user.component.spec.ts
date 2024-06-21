import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMedicamentsUserComponent } from './liste-medicaments-user.component';

describe('ListeMedicamentsUserComponent', () => {
  let component: ListeMedicamentsUserComponent;
  let fixture: ComponentFixture<ListeMedicamentsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMedicamentsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeMedicamentsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
