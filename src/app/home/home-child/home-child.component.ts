import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api-service.service';
import { Chart } from "chart.js";
import { Current } from 'src/app/shared/models/current';
import { Forecast } from 'src/app/shared/models/forecast';
import { Astro } from 'src/app/shared/models/astro';
import { Day } from 'src/app/shared/models/day';
import { Location } from 'src/app/shared/models/location';
import { Weekday } from 'src/app/shared/enums/weekdays';
import { WindDirections } from 'src/app/shared/enums/windDirections';

@Component({
  selector: 'app-home-child',
  templateUrl: './home-child.component.html',
  styleUrls: ['./home-child.component.scss'],
})
export class HomeChildComponent implements OnInit, OnDestroy {

  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: false,
    slidesPerView: 6
  }

  @Input() local: string;
  public forecast: Forecast;
  public current: Current;
  public day: Day;
  public astro: Astro;
  public location: Location;

  private subArray: Subscription[] = [];
  doughnutChart: Chart;

  constructor(protected apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getForecast(this.local).subscribe(
      result => {
        console.log(result);
        this.forecast = result.forecast;
        this.location = result.location;
        this.current = result.current;
        this.day = result.forecast.forecastday[0].day;
        this.astro = result.forecast.forecastday[0].astro;
        this.iniciarChart();
      }
    );
  }

  iniciarChart() {
    let nivelHumidade = this.current.humidity;
    let util = 100 - nivelHumidade;
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        datasets: [
          {
            label: "# of Votes",
            data: [util, nivelHumidade],
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

  showLink() {
    console.log(this.apiService.getApiUrl("current.json?q=".concat(this.local)));
  }

  /*getCurrentDay():void{
    this.apiService.getCurrent(this.local).subscribe(
      result => {
        console.log(result);
      }
    );
  }*/

  getForecast(): void {
    this.apiService.getForecast(this.local).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  /*getAstronomy():void{
    this.apiService.getAstronomy(this.local).subscribe(
      result => {
        console.log(result);
      }
    );
  }*/

  ngOnDestroy(): void {
    this.subArray.forEach(sub => sub && !sub.closed && sub.unsubscribe);
  }

  MathHtml(num: number) {
    if (num === null) return 0;
    return Math.floor(num);
  }

  devolveDiaSemana(data: string): string {
    if (data === null) return "";
    let date = new Date(data);
    return Weekday[date.getDay()];
  }
  devolveHoras(data: string): number {
    if (data === null) return 0;
    let date = new Date(data);
    return date.getHours();
  }

  devolverDirecaoVento(data: string): string {
    if (data === null) return "";
    return WindDirections[data];
  }

  devolverHorasFormatoEuropeu(data: string): string {
    if (data === null) return "";
    const [time, modifier] = data.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = (parseInt(hours, 10) + 12) + '';
    }

    return `${hours}h${minutes}`;
  }

}