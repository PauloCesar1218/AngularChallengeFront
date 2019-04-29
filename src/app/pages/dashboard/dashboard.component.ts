import { Component, OnInit } from '@angular/core';
import { InformationService } from '../../core/services/information.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public information: any = [];
  public status: boolean;
  public doughnutChartData = [];
  public doughnutChartLabels = [];
  public chartColors: any[] = [
    {
      backgroundColor: []
    }
  ];
  public chartOptions: any = {
    legend: {
      position: 'right',
      labels: {
        fontSize: 12,
        boxWidth: 12,
        padding: 12,
        usePointStyle: true
      }
    }
  };
  public doughnutChartType = 'doughnut';
  constructor( private infoService: InformationService ) { }
  ngOnInit() {
    this.getAllInformation();
  }
  onSubmit(event, form) {
    this.insertInformation(form.value);
    setTimeout(() => {
      this.getAllInformation();
      form.reset();
    }, 100);
  }
  insertInformation(information)  {
    this.infoService.persistInfo(information).subscribe((data) => {
      this.information = data.infos;
      this.status = data.status;
    },
    (error) => {
      console.log(error);
    });
  }
  getAllInformation() {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    this.infoService.getInfo().subscribe((data) => {
      this.information = data.infos;
      data.infos.forEach(chartData => {
        this.doughnutChartData.push(chartData.participacao);
        this.doughnutChartLabels.push(chartData.nome);
        this.chartColors[0].backgroundColor.push(this.generateRandomColor());
      });
    },
    (error) => {
      console.log(error);
    });
  }
  generateRandomColor(): any {
    return '#' + Math.floor( Math.random() * 16777215 ).toString(16);
  }
}
