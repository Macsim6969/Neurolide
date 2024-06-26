import {Injectable} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";


@Injectable()

export class ProfileIconService {
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('delete-attention', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/profile/delete-attention.svg'));
  }
}
