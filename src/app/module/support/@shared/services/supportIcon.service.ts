import {Injectable} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";


@Injectable()

export class SupportIconService {
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('albert', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/support/albert.svg'));
    this.matIconRegistry.addSvgIcon('books', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/support/books.svg'));
    this.matIconRegistry.addSvgIcon('diagram', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/support/diagram.svg'));
    this.matIconRegistry.addSvgIcon('paint', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/support/paint.svg'));
    this.matIconRegistry.addSvgIcon('pansile', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/support/pansile.svg'));
    this.matIconRegistry.addSvgIcon('rocket', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/support/rocket.svg'));
  }
}
