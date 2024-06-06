import { Component, OnInit } from '@angular/core';
import { PopupInfoService } from './@shared/services/popupInfo.service';
import { take, timer } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public isPopup: boolean;
  constructor(private popupInfoService: PopupInfoService) { }

  ngOnInit(): void {
    this.popupInfoService._isAlert$.subscribe((data: boolean) => {
      this.isPopup = data;

      if(this.isPopup){
        timer(1000).pipe(take(1)).subscribe(() =>{
          this.popupInfoService._isAlert = false;
        })
      }
    })
  }
}
