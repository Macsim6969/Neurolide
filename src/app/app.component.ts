import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  choiceLang: ['en', 'ua', 'ru'] = ['en', 'ua', 'ru'];
  constructor(
    private translate: TranslateService
  ) { }
  ngAfterViewInit(): void {
    if (this.translate.getBrowserLang() === this.choiceLang.find(e => e === this.translate.getBrowserLang())) {
      console.log(this.translate.getBrowserLang())
      this.translate.use(this.translate.getBrowserLang())
    }
  }
}
