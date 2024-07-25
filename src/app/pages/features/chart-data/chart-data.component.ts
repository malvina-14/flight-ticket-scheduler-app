import {Component, Input, OnInit} from '@angular/core';
import {Chart, ChartData, ChartType, registerables} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {TicketTypePieChartComponent} from "./ticket-type-pie-chart/ticket-type-pie-chart.component";
import {EarningsLineChartComponent} from "./earnings-line-chart/earnings-line-chart.component";
Chart.register(...registerables)

@Component({
  selector: 'app-chart-data',
  standalone: true,
  imports: [
    BaseChartDirective,
    TicketTypePieChartComponent,
    EarningsLineChartComponent
  ],
  templateUrl: './chart-data.component.html',
  styleUrl: './chart-data.component.scss'
})

export class ChartDataComponent {

}
