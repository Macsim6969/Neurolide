import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()

export class ProfileServices {

  private isPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  set _isPopup(value: boolean){
    this.isPopupSubject.next(value);
  }

  get _isPopup$(){
    return this.isPopupSubject;
  }
}