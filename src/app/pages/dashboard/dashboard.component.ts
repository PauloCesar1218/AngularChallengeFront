import { Component, OnInit, ViewChild } from '@angular/core';
import { InformationService } from '../../core/services/information.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Info } from '../../shared/models/info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  information: Info;
  infoArr: Info[];
  alertColor: string;
  alertMessage: string;
  return: any;
  @ViewChild('alert') alert;
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
    console.log(document.querySelector('.no-js'));
  }
  onSubmit(event, form) {
    console.log(form.value);
    this.insertInformation(form.value);
    setTimeout(() => {
      this.getAllInformation();
      form.reset();
    }, 100);
  }

  insertInformation(information)  {
    this.infoService.persistInfo(information).subscribe((data: any) => {
      this.return = data;
      this.alertColor = data.alertColor;
      this.alertMessage = data.msg;
      console.log(this.alertMessage, this.alertColor);
      console.log(this.return);
    },
    (error) => {
      console.log(error);
      this.alertColor = error.error.alertColor;
      this.alertMessage = error.error.msg;
      console.log(this.alertMessage, this.alertColor);
    });
    console.log(this.alert.nativeElement.classList);

    this.alert.nativeElement.classList.remove('no-js');
    this.alert.nativeElement.classList.add('animation');
  }
  getAllInformation() {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    this.infoService.getInfo().subscribe((data: any) => {
      this.infoArr = data.infos;
      this.infoArr.forEach((info) => {
        this.doughnutChartData.push(info.participacao);
        this.doughnutChartLabels.push(info.nome);
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

  closeAlert(event) {
    const alert = event.target.parentNode;
    console.log(alert);
    alert.classList.add('no-js');
    alert.classList.remove('animation');
  }

  showAlert(alert) {
    console.log('alert');
    alert.classList.remote('no-js');
    alert.classList.add('animation');
  }
}
