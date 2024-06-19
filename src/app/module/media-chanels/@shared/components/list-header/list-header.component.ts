import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { UserSearch } from '../../../../users/@share/interfaces/user.interface';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';

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
  constructor(
    private translate: TranslateService,
    private globalIcon: GlobalIconsService,
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
