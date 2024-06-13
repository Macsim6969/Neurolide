import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ListIconsService } from '../../services/listIcon.service';
import { UserSearch } from '../../interfaces/user.interface';
import { UserSearchService } from '../../services/userSearch.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit, AfterViewInit, OnDestroy {


  public active: number = 0;
  public isActive: boolean[];
  public userHead: UserSearch[];
  private translateSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private listIcon: ListIconsService,
    private userSearch: UserSearchService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeDataFromJSON();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  private initializeDataFromJSON() {
    this.translateSubscription = this.translate.stream('user.userSearch').subscribe((data: UserSearch[]) => {
      data ? this.userHead = data: null

    })

  }

  public toogleFilter(i: number, tag: string) {
    this.isActive = []
    if (i === this.active) {
      this.active = null;
      this.isActive[i] = false;
      this.userSearch._searchData = '';
    } else {
      this.active = i;
      this.isActive[i] = true;
      this.userSearch._searchData = tag;
    }

  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }

}
