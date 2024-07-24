import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightTicketListComponent } from './fight-ticket-list.component';

describe('FightTicketListComponent', () => {
  let component: FightTicketListComponent;
  let fixture: ComponentFixture<FightTicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightTicketListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FightTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
