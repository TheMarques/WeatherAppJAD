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
  private readonly imgUrl:string = 'assets/backgrounds/';
  private subArray: Subscription[] = [];
  doughnutChart: Chart;

  constructor(protected apiService: ApiService) { }

  /**
   * Faz a chamada a API quando inicia
   */
  ngOnInit(): void {
    this.getForecast();
  }

  /**
   * Inicializa o gráfico de humidade
   */
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
    }else if(text.includes('NUVENS')|| text.includes('NUVEM') || text.includes('NUBLADO')){
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
    }else if(text.includes('NUVENS')|| text.includes('NUVEM') || text.includes('NUBLADO')){
      return `${this.imgUrl}nuvens-dia.gif`;
    }else{
      return `${this.imgUrl}dia-limpo.gif`;
    }
  }

  /**
   *  Verifica se já é de noite ou não atraves da horas fornecidas pela API
   *  Caso seja de noite devolve true
   */
  noite(): boolean{
    return this.current.is_day == 0;  
  }
  
  /**
   * Faz a chamada a API e atribui o valor a todos os campos
   */
  getForecast(): void {
    let api:Subscription = this.apiService.getForecast(this.local).subscribe(
      result => {
        this.forecast = result.forecast;
        this.location = result.location;
        this.current = result.current;
        this.day = result.forecast.forecastday[0].day;
        this.astro = result.forecast.forecastday[0].astro;
        this.iniciarChart();
        this.escolherBackground();
      }
    );
    this.subArray.push(api);
  }

  /**
   * Apaga todas as subscrições efetuadas durante o runtime
   */
  ngOnDestroy(): void {
    this.subArray.forEach(sub => sub && !sub.closed && sub.unsubscribe);
  }

  /**
   * Retorna o valor de entrada aredondado para baixo
   * @param num 
   */
  MathHtml(num: number) {
    if (num === null) return 0;
    return Math.floor(num);
  }

  /**
   * Devolve o dia da semana com base na string
   * Serve para converter o campo que vem da api "(Date)""
   * @param data 
   */
  devolveDiaSemana(data: string): string {
    if (data === null) return "";
    let date = new Date(data);
    return Weekday[date.getDay()];
  }

  /**
   * Devolve as Horas a partir de uma string
   * Serve para converter o campo que vem da api "(Date)""
   * para obter apenas as horas
   * @param data 
   */
  devolveHoras(data: string): number {
    if (data === null) return 0;
    let date = new Date(data);
    return date.getHours();
  }

  /**
   * Retorna uma string com a direção do vento por extenso
   * com base no parâmetro de entrada
   * @param data 
   */
  devolverDirecaoVento(data: string): string {
    if (data === null) return "";
    return WindDirections[data];
  }

  /**
   * Retorna uma string com a hora convertida
   * de formato 12 AM/PM para formato 24 Horas
   * @param data 
   */
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