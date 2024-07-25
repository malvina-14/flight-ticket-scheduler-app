import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTypePieChartComponent } from './ticket-type-pie-chart.component';

describe('TicetTypePieChartComponent', () => {
  let component: TicketTypePieChartComponent;
  let fixture: ComponentFixture<TicketTypePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTypePieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTypePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
