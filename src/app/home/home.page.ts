import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cidadesComponent: string = '';
  cidades: string[] = [];

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(protected apiService: ApiService) { }

  /**
   *  Verificar localstorage por cidades
   *  Se sim atribuir a variavel cidades
   *  Se não atribui Lisboa como defeito
   */
  ngOnInit() {
    if (localStorage.getItem("cidades")) {
      this.cidades = JSON.parse(localStorage.getItem("cidades"));
    }
    if (this.cidades.length == 0) {
      this.cidades = ['Lisboa, Portugal'];
    }
  }

  /**
   * 
   */
  toggleCidadesComponent() {
    this.cidadesComponent = this.cidadesComponent.length == 0 ? 'ativo' : '';
  }

  /**
   * 
   * @param vazio 
   */
  toggleCidadesComponentEvent(vazio: string) {
    this.cidadesComponent = vazio;
  }

  /**
   * Atualiza o campo cidades com informação que vem do parâmetro de entrada
   * @param cidades 
   */
  updateCidade(cidades: string[]) {
    this.cidades = cidades;
    //Guarda cidades em localstorage
    localStorage.setItem("cidades", JSON.stringify(this.cidades));
  }
}
