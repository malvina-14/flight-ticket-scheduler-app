import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsLineChartComponent } from './earnings-line-chart.component';

describe('EarningsLineChartComponent', () => {
  let component: EarningsLineChartComponent;
  let fixture: ComponentFixture<EarningsLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningsLineChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarningsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
