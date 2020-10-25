import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api-service.service';

@Component({
  selector: 'app-home-child',
  templateUrl: './home-child.component.html',
  styleUrls: ['./home-child.component.scss'],
})
export class HomeChildComponent implements OnInit, OnDestroy {

  arrayDumby = [0,1,2,3,4,5];

  @Input() local: string;

  private subArray: Subscription[] = [];
  
  constructor(protected apiService: ApiService) {}
  
  ngOnInit(): void {
    
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
