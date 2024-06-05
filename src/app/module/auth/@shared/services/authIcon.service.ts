import {Injectable} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";


@Injectable()

export class AuthIconsService {
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('view', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/auth/view.svg'));
  }
}
