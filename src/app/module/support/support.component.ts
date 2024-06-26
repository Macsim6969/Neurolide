import { Component } from '@angular/core';
import { IsMobilePage } from '../../shared/abstract/mobilePage/mobilePage';
import { NavigationIconsService } from '../../shared/services/navigation/navigationIcon.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent extends IsMobilePage {
  constructor(
    private navigationIconsService: NavigationIconsService
  ) {
    super()
  }
}
