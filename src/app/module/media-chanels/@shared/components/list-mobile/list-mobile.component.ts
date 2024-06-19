import { Component } from '@angular/core';
import { MediaChannelsDataClass } from '../../abstract/mediaChannelsData';

@Component({
  selector: 'app-list-mobile',
  templateUrl: './list-mobile.component.html',
  styleUrls: ['./list-mobile.component.scss']
})
export class ListMobileComponent extends MediaChannelsDataClass {
  public activeSlide: number = 0;

  public changeActiveCard(event: number) {
    this.activeSlide = event;
  }
}
