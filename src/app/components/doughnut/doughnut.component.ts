import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent implements OnInit {
  ngOnInit(): void {

    this.doughnutChartType = 'doughnut';
    this.doughnutChartData = {
        labels: this.doughnutChartLabels,
        datasets: [
          { 
            data: this.doughnutChartDatasets,
            backgroundColor: this.doughnutChartColor 
          },
        ]
      };
    

  }

  @Input() public doughnutChartName: string = 'No Title';
  @Input() public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input() public doughnutChartDatasets: number[] = [ 10, 10, 10 ];
  @Input() public doughnutChartColor: Color[] = [ '#1B4F72', '#DAF7A6', '#FFC300' ];
  
  public doughnutChartType!: ChartType;
  public doughnutChartData!: ChartData<'doughnut'>;

}
