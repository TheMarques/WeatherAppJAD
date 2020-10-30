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

  ngOnInit():void {
    this.verificaNumeroCidades();
  }

  /**
   * Emite uma string vazia para o componente pai
   * para substituir na variável que controla uma das
   * ngClasses
   */
  cidadesDisplauChange():void{
    this.cidadesDisplayChange.emit('')
  }

  /**
   * Emite para o componente pai as cidades existentes 
   * no array cidade no momento exato
   */
  cidadesArrayEventF():void{
    this.cidadesChange.emit(this.cidades);
  }

  /**
   * Retira do array cidades uma cidade especifica
   * @param cidade nome da cidade
   */
  apagarCidade(cidade: string):void{
    const index = this.cidades.indexOf(cidade);
    if (index > -1) {
      this.cidades.splice(index, 1);
    }
    this.cidadesArrayEventF();
    this.verificaNumeroCidades();
  }

  /**
   * Adiciona uma cidade ao array 
   * Chama também as outras funções necessárias
   */
  adicionarCidade():void{
    this.cidades.push(this.inputCidade);
    this.cidadesArrayEventF();
    this.toggleAdcCidade();
    this.verificaNumeroCidades();
    this.inputCidade = '';
  }

  /**
   * Controla o display de um elemento DOM através de uma ngClass
   */
  toggleAdcCidade():void{
    this.adcCidadeDisplay = this.adcCidadeDisplay.length == 0 ? 'ativo' :  '';
  }

  /**
   * Caso haja só uma cidade tira o display do icon ,
   * que tem acesso à função que apaga a cidade em questão
   */
  verificaNumeroCidades():void{
    this.disableTrash = this.cidades.length == 1 ? 'desativo' : '';
  }

}
