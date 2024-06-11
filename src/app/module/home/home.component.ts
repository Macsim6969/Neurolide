import { Component, OnInit } from '@angular/core';
import { StoreInterface } from '../../store/model/store.model';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../store/selectors/store.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.initializeUserData();
  }

  private initializeUserData() {
    this.store.select(selectUserData).subscribe((data) => {
      console.log(data.rules)
      if (data.rules) {
        this.router.navigate([`/${data.rules}`]).then()
      }
    })
  }

}
