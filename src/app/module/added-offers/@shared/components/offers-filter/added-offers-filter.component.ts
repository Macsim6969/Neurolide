import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { UserSearchService } from '../../../../../shared/services/userSearch.service';
import { OffersFilter } from '../../../../../shared/abstract/offers/offersFilter';

@Component({
  selector: 'app-added-offers-filter',
  templateUrl: './added-offers-filter.component.html',
  styleUrls: ['./added-offers-filter.component.scss']
})
export class AddedOffersFilterComponent extends OffersFilter {

  constructor(
    override translate: TranslateService,
    override globalIcon: GlobalIconsService,
    override cd: ChangeDetectorRef,
    override userSearchService: UserSearchService
  ) {
    super(translate, globalIcon, cd, userSearchService);
    super.ngOnInit();
  }
}
