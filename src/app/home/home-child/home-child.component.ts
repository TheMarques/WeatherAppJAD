import {  AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api-service.service';
import { Chart } from "chart.js";

@Component({
  selector: 'app-home-child',
  templateUrl: './home-child.component.html',
  styleUrls: ['./home-child.component.scss'],
})
export class HomeChildComponent implements OnInit, OnDestroy, AfterViewInit{

  arrayDumby = [0,1,2,3,4,5];
  arrayDumby2 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;

  sliderConfig = {
    spaceBetween:10,
    centeredSlides: false,
    slidesPerView: 6 
  }

  @Input() local: string;

  private subArray: Subscription[] = [];
  doughnutChart: Chart;
  
  constructor(protected apiService: ApiService) {}

  ngAfterViewInit(): void {
    this.iniciarChart();
  }
  
  ngOnInit(): void {
  }

  iniciarChart(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        datasets: [
          {
            label: "# of Votes",
            data: [20, 80],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
          }
        ]
      }
    });
  }

  showLink(){
    console.log(this.apiService.getApiUrl("current.json?q=".concat(this.local)));
  }

  getCurrentDay():void{
    this.apiService.getCurrent(this.local).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  getForcast():void{
    this.apiService.getForecast(this.local).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  getAstronomy():void{
    this.apiService.getAstronomy(this.local).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  ngOnDestroy(): void {
    this.subArray.forEach(sub => sub && !sub.closed && sub.unsubscribe);
  }

}
