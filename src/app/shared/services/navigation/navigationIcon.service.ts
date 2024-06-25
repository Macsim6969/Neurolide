import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";


@Injectable()

export class NavigationIconsService {
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    
    this.matIconRegistry.addSvgIcon('main', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/sidebar/main.svg'));
    this.matIconRegistry.addSvgIcon('manager', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/sidebar/manager.svg'));
    this.matIconRegistry.addSvgIcon('users', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/sidebar/users.svg'));
    this.matIconRegistry.addSvgIcon('media-canal', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/sidebar/media-canal.svg'));
    this.matIconRegistry.addSvgIcon('profile', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/sidebar/profile.svg'));
    this.matIconRegistry.addSvgIcon('balance', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/sidebar/balance.svg'));
    this.matIconRegistry.addSvgIcon('support', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/sidebar/support.svg'));
  }
}
