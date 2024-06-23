import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { StoreInterface } from './store/model/store.model';
import { newUserID, setRegiset, startGetData } from './store/actions/store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  choiceLang: ['en', 'ua', 'ru'] = ['en', 'ua', 'ru'];
  constructor( 
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngAfterViewInit(): void {
    this.initializeTranslateLang();
    this.initializeIsUserData();
  }

  private initializeTranslateLang() {
    if (this.translate.getBrowserLang() === this.choiceLang.find(e => e === this.translate.getBrowserLang())) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en');
    }
  }

  private initializeIsUserData() {
    if (localStorage.getItem('userData')) {
      const id = JSON.parse(localStorage.getItem('userData'))
      this.store.dispatch(newUserID({id: id.localId}))

      this.store.dispatch(startGetData({ data: true }))
     
    }
  }
}
