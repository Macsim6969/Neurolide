import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";


@Injectable()

export class ListIconsService {
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon('arrow_slide', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/user/arrow_slide.svg'));
      this.matIconRegistry.addSvgIcon('arrow_mobile', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/user/arrow_mobile.svg'));
    this.matIconRegistry.addSvgIcon('arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/user/arrow.svg'));
    this.matIconRegistry.addSvgIcon('edite', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/edite.svg'));
    this.matIconRegistry.addSvgIcon('save', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/save.svg'));
    this.matIconRegistry.addSvgIcon('settings', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/settings.svg'));
    this.matIconRegistry.addSvgIcon('remove', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/remove.svg'));
  }
}
