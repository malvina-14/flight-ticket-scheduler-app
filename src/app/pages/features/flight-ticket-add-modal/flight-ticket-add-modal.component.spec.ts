import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTicketAddModalComponent } from './flight-ticket-add-modal.component';

describe('FlightTicketAddModalComponent', () => {
  let component: FlightTicketAddModalComponent;
  let fixture: ComponentFixture<FlightTicketAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightTicketAddModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightTicketAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
