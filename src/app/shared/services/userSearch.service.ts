import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()

export class UserSearchService {

  private searchDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private sortDirections: { [key: string]: boolean } = {};
  set _searchData(value: string) {
    this.searchDataSubject.next(value);
  }

  get _searchData$() {
    return this.searchDataSubject;
  }

  setSortDirection(field: string, direction: boolean) {
    this.sortDirections[field] = direction;
  }

  getSortDirection(field: string): boolean {
    return this.sortDirections[field] !== undefined ? this.sortDirections[field] : true;
  }

  toggleSortDirection(field: string) {
    if (this.sortDirections[field] !== undefined) {
      this.sortDirections[field] = !this.sortDirections[field];
    } else {
      this.sortDirections[field] = true;
    }
  }
}