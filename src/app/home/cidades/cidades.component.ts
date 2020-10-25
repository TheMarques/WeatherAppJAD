import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.scss'],
})
export class CidadesComponent implements OnInit {

  
  adcCidadeDisplay: string = '';
  inputCidade: string = '';
  disableTrash: string = '';

  @Input() cidadesDisplay: string;
  @Input() cidades: string[];
  @Output() cidadesDisplayChange = new EventEmitter<string>();
  @Output() cidadesChange = new EventEmitter<string[]>();
  constructor() { }

  ngOnInit() {
    this.verificaNumeroCidades();
  }


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
    this.verificaNumeroCidades();
  }

  adicionarCidade(){
    this.cidades.push(this.inputCidade);
    this.cidadesArrayEventF();
    this.toggleAdcCidade();
    this.verificaNumeroCidades();
    this.inputCidade = '';
  }

  toggleAdcCidade(){
    this.adcCidadeDisplay.length == 0 ? this.adcCidadeDisplay = 'ativo' : this.adcCidadeDisplay = '';
  }

  verificaNumeroCidades(){
    this.cidades.length == 1 ? this.disableTrash = 'desativo' : this.disableTrash = '';
  }

}
