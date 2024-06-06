import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()

export class PopupInfoService {

  private isAlertSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  set _isAlert(value: boolean){
    this.isAlertSubject.next(value);
  }

  get _isAlert$(){
    return this.isAlertSubject;
  }
}