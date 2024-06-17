import { Component } from '@angular/core';
import { CardsconService } from '../../shared/services/balance/cardsIcon.service';

@Component({
  selector: 'app-main-mobile-page',
  templateUrl: './main-mobile-page.component.html',
  styleUrls: ['./main-mobile-page.component.scss']
})
export class MainMobilePageComponent {

  constructor(private cardsIcon: CardsconService) { }
}
