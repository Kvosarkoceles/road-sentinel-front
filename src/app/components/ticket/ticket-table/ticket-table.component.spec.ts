import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudesComponent } from './ticket-table.component';

describe('TablaSolicitudesComponent', () => {
  let component: TablaSolicitudesComponent;
  let fixture: ComponentFixture<TablaSolicitudesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaSolicitudesComponent]
    });
    fixture = TestBed.createComponent(TablaSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
