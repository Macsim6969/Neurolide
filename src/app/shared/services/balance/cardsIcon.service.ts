import {Injectable} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";


@Injectable()

export class CardsconService {
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('visa', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/cards/visa.svg'));
    this.matIconRegistry.addSvgIcon('master_card', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/cards/master_card.svg'));
    this.matIconRegistry.addSvgIcon('copy', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/cards/copy.svg'));
    this.matIconRegistry.addSvgIcon('more', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/cards/more.svg'));
    this.matIconRegistry.addSvgIcon('plus', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/cards/plus.svg'));
  }
}
