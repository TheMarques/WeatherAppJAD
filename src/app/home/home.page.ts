import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../shared/services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  private subArray: Subscription[] = [];
  
  constructor(protected apiService: ApiService) {}

  showLink(){
    console.log(this.apiService.getApiUrl("current.json?q=".concat("Lisbon")));
  }

  getCurrentDay():void{
    this.apiService.getCurrent("Lisbon").subscribe(
      result => {
        console.log(result);
      }
    );
  }

  getForcast():void{
    this.apiService.getForecast("Lisbon").subscribe(
      result => {
        console.log(result);
      }
    );
  }

  getAstronomy():void{
    this.apiService.getAstronomy("Lisbon").subscribe(
      result => {
        console.log(result);
      }
    );
  }

  ngOnDestroy(): void {
    this.subArray.forEach(sub => sub && !sub.closed && sub.unsubscribe);
  }
}
