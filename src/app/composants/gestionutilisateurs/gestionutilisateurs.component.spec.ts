import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionutilisateursComponent } from './gestionutilisateurs.component';

describe('GestionutilisateursComponent', () => {
  let component: GestionutilisateursComponent;
  let fixture: ComponentFixture<GestionutilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionutilisateursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionutilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
