import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";


@Injectable()

export class GlobalIconsService {
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/user/arrow.svg'));
    this.matIconRegistry.addSvgIcon('arrow_slide', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/user/arrow_slide.svg'));
    this.matIconRegistry.addSvgIcon('arrow_mobile', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/user/arrow_mobile.svg'));
    this.matIconRegistry.addSvgIcon('search', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/global/search.svg'));

    this.matIconRegistry.addSvgIcon('edite', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/edite.svg'));
    this.matIconRegistry.addSvgIcon('save', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/save.svg'));
    this.matIconRegistry.addSvgIcon('settings', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/settings.svg'));
    this.matIconRegistry.addSvgIcon('remove', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/remove.svg'));
    this.matIconRegistry.addSvgIcon('confirme', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/confirme.svg'));
    this.matIconRegistry.addSvgIcon('vip', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/vip.svg'));
    this.matIconRegistry.addSvgIcon('add', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/global/add.svg'));
    this.matIconRegistry.addSvgIcon('cancel', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/cancel.svg'));
    this.matIconRegistry.addSvgIcon('offer_confirme', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/global/offer_confirme.svg'));

    this.matIconRegistry.addSvgIcon('credit-card', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/global/credit-card.svg'));
  }
}
