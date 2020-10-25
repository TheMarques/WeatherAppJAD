import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../shared/services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
}
