import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()

export class SearchMediaChannelAndOffersService{

  private searchTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  set _searchText(value: string){
    this.searchTextSubject.next(value);
  }

  get _searchText$(){
    return this.searchTextSubject;
  }
}