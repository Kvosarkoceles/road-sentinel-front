import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesComponent } from './ticket-all.component';

describe('SolicitudesComponent', () => {
  let component: SolicitudesComponent;
  let fixture: ComponentFixture<SolicitudesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudesComponent]
    });
    fixture = TestBed.createComponent(SolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
