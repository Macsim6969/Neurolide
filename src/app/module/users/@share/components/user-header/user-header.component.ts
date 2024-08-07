import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { UserSearch } from '../../interfaces/user.interface';

import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { UserSearchService } from '../../../../../shared/services/userSearch.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public active: number = 0;
  public isActive: boolean[];
  public userHead: UserSearch[];
  constructor(
    private translate: TranslateService,
    private globaIcon: GlobalIconsService,
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
    this.translate.stream('user.userSearch').pipe(takeUntil(this.destroy$)).subscribe((data: UserSearch[]) => {
      data ? this.userHead = data : null
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
    this.destroy$.next();
    this.destroy$.complete();
  }

}
