import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.scss'],
})
export class CidadesComponent implements OnInit {

  
  adcCidadeDisplay: string = '';
  inputCidade: string = '';

  @Input() cidadesDisplay: string;
  @Input() cidades: string[];
  @Output() cidadesDisplayChange = new EventEmitter<string>();
  @Output() cidadesChange = new EventEmitter<string[]>();
  constructor() { }

  ngOnInit() {}


  cidadesDisplauChange(){
    this.cidadesDisplayChange.emit('')
  }

  cidadesArrayEventF(){
    this.cidadesChange.emit(this.cidades);
  }

  apagarCidade(cidade: string){
    const index = this.cidades.indexOf(cidade);
    if (index > -1) {
      this.cidades.splice(index, 1);
    }
    this.cidadesArrayEventF();
  }

  adicionarCidade(){
    this.cidades.push(this.inputCidade);
    this.cidadesArrayEventF();
    this.toggleAdcCidade();
    this.inputCidade = '';
  }

  toggleAdcCidade(){
    this.adcCidadeDisplay.length == 0 ? this.adcCidadeDisplay = 'ativo' : this.adcCidadeDisplay = '';
  }

}
