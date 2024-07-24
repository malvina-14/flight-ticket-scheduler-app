import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTicketViewModalComponent } from './flight-ticket-view-modal.component';

describe('FlightTicketViewModalComponent', () => {
  let component: FlightTicketViewModalComponent;
  let fixture: ComponentFixture<FlightTicketViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightTicketViewModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightTicketViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
