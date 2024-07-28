import {Component, OnInit} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartType} from "chart.js";
import {TicketService} from "../../../services/ticket.service";

@Component({
  selector: 'app-earnings-line-chart',
  standalone: true,
    imports: [
        BaseChartDirective
    ],
  templateUrl: './earnings-line-chart.component.html',
  styleUrl: './earnings-line-chart.component.scss'
})
export class EarningsLineChartComponent implements OnInit{
  lineChartOptions = {
    responsive: true
  };
  lineChartLabels: string[] = [];
  lineChartType: ChartType = 'line';
  lineChartData: any[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.tickets().subscribe(data => {
      const earningsByDate: { [key: string]: number } = {};

      data.forEach(ticket => {
        const date = new Date(ticket.from_date).toLocaleDateString('en-US');
        const roundedPrice = Math.round(ticket.price);
        earningsByDate[date] = (earningsByDate[date] || 0) + roundedPrice;
      })

      this.lineChartLabels = Object.keys(earningsByDate);
      this.lineChartData = [
        {
          data: Object.values(earningsByDate),
          label: 'Earnings',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
        }
      ];
    });
  }
}
