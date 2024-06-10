import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from '../../../../../environment/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BackendService } from "../../../../shared/services/backend.service";

@Injectable()

export class UserService {

  private isUserPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(
    private http: HttpClient,
    private backendService: BackendService
  ) { }

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