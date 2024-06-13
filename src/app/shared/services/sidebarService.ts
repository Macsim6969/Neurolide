import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()

export class SidebarService{

  private isSidebarOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set _isSidebarMobile(value: boolean){
    this.isSidebarOpenSubject.next(value);
  }

  get _isSidebarMobile$(){
    return this.isSidebarOpenSubject;
  }
}