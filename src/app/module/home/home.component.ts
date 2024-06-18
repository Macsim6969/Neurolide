import { Component } from '@angular/core';
import { IsMobilePage } from '../../shared/abstract/mobilePage/mobilePage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends IsMobilePage {

}
