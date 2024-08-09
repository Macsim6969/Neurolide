import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { UserSearch } from "../../../module/users/@share/interfaces/user.interface";
import { TranslateService } from "@ngx-translate/core";
import { GlobalIconsService } from "../../services/globalIcon.service";
import { UserSearchService } from "../../services/userSearch.service";

@Component({
  template: ''
})

export abstract class OffersFilter implements OnInit, AfterViewInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public rules: string;
  public active: number = 0;
  public isActive: boolean[];
  public userHead: UserSearch[];
  public sortDirections: { [key: string]: boolean } = {};
  constructor(
    protected translate: TranslateService,
    protected globalIcon: GlobalIconsService,
    protected cd: ChangeDetectorRef,
    protected userSearchService: UserSearchService
  ) { }

  ngOnInit(): void {
    this.checkRulesUser();
    this.initializeDataFromJSON();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  private checkRulesUser() {
    this.rules = JSON.parse(localStorage.getItem('rules'));
  }

  private initializeDataFromJSON() {
    this.translate.stream('offers.offerSearch').pipe(takeUntil(this.destroy$)).subscribe((data: UserSearch[]) => {
      data ? this.userHead = data : null
    })
  }

  public toogleFilter(i: number, tag: string) {
    this.isActive = [];

    if (i === this.active) {
      this.userSearchService.toggleSortDirection(tag);
    } else {
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