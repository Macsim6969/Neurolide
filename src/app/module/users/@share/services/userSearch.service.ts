import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()

export class UserSearchService{

  private searchDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  set _searchData(value: string){
    this.searchDataSubject.next(value);
  }

  get _searchData$(){
    return this.searchDataSubject;
  }
}