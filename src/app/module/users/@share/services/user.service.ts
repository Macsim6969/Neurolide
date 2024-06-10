import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class UserService {
  
  private isUserPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  
  set _isUserPopup(value: boolean){
    this.isUserPopupSubject.next(value);
  }

  get _isUserPopup$(){
    return this.isUserPopupSubject;
  }

  set _isUser(value: any){
    this.isUserSubject.next(value);
  }

  get _isUser$(){
    return this.isUserSubject;
  }
}