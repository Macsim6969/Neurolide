import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { UserSearch } from '../../../../users/@share/interfaces/user.interface';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { UserSearchService } from '../../../../../shared/services/userSearch.service';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public active: number = 0;
  public isActive: boolean[];
  public userHead: UserSearch[];
  public sortDirections: { [key: string]: boolean } = {};
  constructor(
    private translate: TranslateService,
    private globalIcon: GlobalIconsService,
    private cd: ChangeDetectorRef,
    private userSearchService: UserSearchService
  ) { }

  ngOnInit(): void {
    this.initializeDataFromJSON();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  private initializeDataFromJSON() {
    this.translate.stream('media.mediaSearch').pipe(takeUntil(this.destroy$)).subscribe((data: UserSearch[]) => {
      data ? this.userHead = data : null
    })
  }

  public toogleFilter(i: number, tag: string) {
    this.isActive = [];
  
    if (i === this.active) {
      // Toggle the sort direction for the active filter
      this.userSearchService.toggleSortDirection(tag);
    } else {
      // Set new active filter and reset sort direction to ascending
      this.active = i;
      this.isActive[i] = true;
      this.userSearchService._searchData = tag;
      this.userSearchService.setSortDirection(tag, true);
    }
  
    if (i === this.active) {
      this.active = null;
      this.isActive[i] = false;
      this.userSearchService._searchData = '';
    } else {
      this.active = i;
      this.isActive[i] = true;
      this.userSearchService._searchData = tag;
    }
  }
  
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
