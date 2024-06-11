import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ListIconsService } from '../../services/listIcon.service';
import { UserSearch } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit, OnDestroy {

  public userHead: UserSearch[]
  private translateSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private listIcon: ListIconsService
  ) { }

  ngOnInit(): void {
    this.initializeDataFromJSON();
  }

  private initializeDataFromJSON() {
    this.translateSubscription = this.translate.stream('user.userSearch').subscribe((data: UserSearch[]) => {
      this.userHead = data;
    })
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }

}
