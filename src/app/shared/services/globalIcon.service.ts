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
  }
}
