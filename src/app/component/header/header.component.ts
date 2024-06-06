import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HeaderInfo } from '../../shared/interfaces/header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public headerData: HeaderInfo[];
  private translateSubscription: Subscription;
  constructor(
    private translate: TranslateService
  ) { }
  ngOnInit(): void {
    this.initializeHeaderDataFromJSON();
  }
  
  private initializeHeaderDataFromJSON() {
    this.translateSubscription = this.translate.stream('headerInfo').subscribe((data: HeaderInfo[]) => {
      this.headerData = data;
    })
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();

  }
}
