import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesFormularioComponent } from './solicitudes-formulario.component';

describe('SolicitudesFormularioComponent', () => {
  let component: SolicitudesFormularioComponent;
  let fixture: ComponentFixture<SolicitudesFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudesFormularioComponent]
    });
    fixture = TestBed.createComponent(SolicitudesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
