import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../shared/services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  cidadesComponent: string = '';
  cidades: string[] = ['Lisboa, Portugal', 'Porto, Portugal'];

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  toggleCidadesComponent(){
    this.cidadesComponent.length == 0 ? this.cidadesComponent = 'ativo' : this.cidadesComponent = '';
  }
  toggleCidadesComponentEvent(vazio: string){
    this.cidadesComponent = vazio;
  }
  updateCidade(cidades: string[]){
    this.cidades = cidades;
  }
}
