import {Injectable} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";


@Injectable()

export class ListIconsService {
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('edite', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/edite.svg'));
  }
}
