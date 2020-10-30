import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cidadesComponent: string = '';
  cidades: string[] = [];
  private subArray: Subscription[] = [];

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(protected apiService: ApiService) { }

  /**
   *  Verificar localstorage por cidades
   *  Se sim, atribui a variável cidades
   *  Se não, atribui cidade através do ip público
   */
  ngOnInit(): void {
    if (localStorage.getItem("cidades")) {
      this.cidades = JSON.parse(localStorage.getItem("cidades"));
    }

    if (this.cidades.length == 0) {
      //Chamada a api para obter ip público
      let api_ip: Subscription = this.apiService.getIPAddress().subscribe(
        result => {
          console.log(result.ip);
          let ipAddress = result.ip;
          this.subArray.push(api_ip);
          
          //Chamada a api para obter localização
          let api_location = this.apiService.getForecast(ipAddress).subscribe(
            result => {
              this.cidades.push(result.location.name);
            }
          );
          this.subArray.push(api_location);
        }
      );
    }
  }

  /**
   * Apaga todas as subscrições efetuadas durante o runtime
   */
  ngOnDestroy(): void {
    this.subArray.forEach(sub => sub && !sub.closed && sub.unsubscribe);
  }

  /**
   * Controla o display de um Component
   */
  toggleCidadesComponent(): void {
    this.cidadesComponent = this.cidadesComponent.length == 0 ? 'ativo' : '';
  }

  /**
   * Controla o display de um Component
   * @param vazio nome da class 
   */
  toggleCidadesComponentEvent(vazio: string): void {
    this.cidadesComponent = vazio;
  }

  /**
   * Atualiza o campo cidades com informação que vem do parâmetro de entrada
   * @param cidades 
   */
  updateCidade(cidades: string[]): void {
    this.cidades = cidades;
    //Guarda cidades em localstorage
    localStorage.setItem("cidades", JSON.stringify(this.cidades));
  }
}
