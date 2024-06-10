import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from '../../../../../environment/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BackendService } from "../../../../shared/services/backend.service";

@Injectable()

export class UserService {

  private isUserTransitionSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isUserPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private transitionSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private activeTransitionSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private activeTransitionIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private activeUserIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private backendService: BackendService
  ) { }

  set _isTransitionPopup(value: boolean) {
    this.isUserTransitionSubject.next(value);
  }

  get _isTransitionPopup$() {
    return this.isUserTransitionSubject;
  }


  set _isUserPopup(value: boolean) {
    this.isUserPopupSubject.next(value);
  }

  get _isUserPopup$() {
    return this.isUserPopupSubject;
  }

  set _isUser(value: any) {
    this.isUserSubject.next(value);
  }

  get _isUser$() {
    return this.isUserSubject;
  }

  get _transitionData$() {
    return this.transitionSubject;
  }

  set _transitionData(value: any) {
    this.transitionSubject.next(value);
  }

  get _activeTransition$() {
    return this.activeTransitionSubject;
  }

  set _activeTransition(value: string) {
    this.activeTransitionSubject.next(value);
  }

  get _activeTransitionId$() {
    return this.activeTransitionIdSubject;
  }

  set _activeTransitionId(value: number) {
    this.activeTransitionIdSubject.next(value);
  }

  get _userId$() {
    return this.activeUserIdSubject;
  }

  set _userId(value: string) {
    this.activeUserIdSubject.next(value);
  }



  public removeUser(id: string, idToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const body = {
      idToken: idToken
    };

    this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${environment.apiKey}`, body, httpOptions).subscribe(() => {
      this.backendService.removeUser(id)
    })
  }
}