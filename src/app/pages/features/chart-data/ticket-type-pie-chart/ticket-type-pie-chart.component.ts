import {Component, OnInit} from '@angular/core';
import {ChartData, ChartType} from "chart.js";
import {TicketService} from "../../../services/ticket.service";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-ticket-type-pie-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './ticket-type-pie-chart.component.html',
  styleUrl: './ticket-type-pie-chart.component.scss'
})
export class TicketTypePieChartComponent implements OnInit {
  pieChartLabels: string[] = [];
  pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: []
  };
  pieChartType: ChartType = 'pie';

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.tickets().subscribe(data => {
      const ticketTypeCounts: { [key: string]: number } = {};

      data.forEach(ticket => {
        ticketTypeCounts[ticket.ticket_type] = (ticketTypeCounts[ticket.ticket_type] || 0) + 1;
      });

      this.pieChartLabels = Object.keys(ticketTypeCounts);
      this.pieChartData = {
        labels: this.pieChartLabels,
        datasets: [{
          data: Object.values(ticketTypeCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
      };
    });
  }
}
