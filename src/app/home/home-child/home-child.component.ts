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
  public backgroundIMG: string = '';
  private imgUrl:string = 'assets/backgrounds/';
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
        this.escolherBackground();
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
            data: [nivelHumidade, util],
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

  escolherBackground(){
    if(this.noite()){
      this.backgroundIMG = this.backgroundsNoite();
    }else{
      this.backgroundIMG = this.backgroundsDia();
    }
  }

  backgroundsNoite(): string{
    let text: string = this.day.condition.text.toUpperCase();
    if (text.includes('CHUVA') || text.includes('AGUACEIRO')) {
      return `${this.imgUrl}chuva.gif`;
    }else if(text.includes('TROVOADA')){
      return `${this.imgUrl}trovoada-noite.gif`;
    }else if(text.includes('NEVE')){
      return `${this.imgUrl}neve-noite.gif`;
    }else if(text.includes('NEVOEIRO')){
      return `${this.imgUrl}nevoeiro-noite.jpg`;
    }else if(text.includes('NUVENS')|| text.includes('NUVEM')){
      return `${this.imgUrl}nuvens-noite.gif`;
    }else{
      return `${this.imgUrl}noite-limpa.jpg`;
    }
  }

  backgroundsDia(): string{
    let text: string = this.day.condition.text.toUpperCase();
    if (text.includes('CHUVA') || text.includes('AGUACEIRO')) {
      return `${this.imgUrl}chuva.gif`;
    }else if(text.includes('TROVOADA')){
      return `${this.imgUrl}trovoada-dia.gif`;
    }else if(text.includes('NEVE')){
      return `${this.imgUrl}neve-dia.gif`;
    }else if(text.includes('NEVOEIRO')){
      return `${this.imgUrl}nevoeiro-dia.jpg`;
    }else if(text.includes('NUVENS')|| text.includes('NUVEM')){
      return `${this.imgUrl}nuvens-dia.gif`;
    }else{
      return `${this.imgUrl}dia-limpa.jpg`;
    }
  }

  /**
   *  Verifica se já é de noite ou não atraves da horas fornecidas pela API
   *  Caso seja de noite devolve true
   */
  noite(): boolean{
    let horasSunset: string = this.forecast.forecastday[0].astro.sunset;
    let horaActual:number = (new Date()).getHours();
    let horasEuropeSunset:string = this.devolverHorasFormatoEuropeu(horasSunset);
    let horasSunsetNumber: number = parseInt(horasEuropeSunset.split('h')[0]);
    return horasSunsetNumber < horaActual ?  true : false;  
  }
  
  getForecast(): void {
    this.apiService.getForecast(this.local).subscribe(
      result => {
        console.log(result);
      }
    );
  }

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