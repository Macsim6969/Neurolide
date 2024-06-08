import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";

import { User } from "../auth.model";
import { BackendService } from "../../../../shared/services/backend.service";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../../../store/model/store.model";
import { newUserID, setRegiset, startGetData } from "../../../../store/actions/store.actions";
import { environment } from '../../../../../environment/environment';
import { Router } from "@angular/router";



export interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string,
  registered?: boolean
}

@Injectable()

export class AuthService {
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public token: string = null;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,
    private backendService: BackendService,
    private router: Router
  ) {
  }

  sigUp(form: { email: string, password: string, name: string, rules: 'affiliate' | 'brand' }) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, {
      email: form.email, password: form.password, rules: form.rules, returnSecureToken: true
    }).pipe(tap(resData => {
      localStorage.setItem('rules', JSON.stringify(form.rules));
      localStorage.setItem('isRegister', JSON.stringify(true));
      localStorage.setItem('id', JSON.stringify(resData.localId));
      this.backendService.sendUserProfile({ userID: resData.localId, email: form.email, password: form.password, name: form.name, rules: form.rules })
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn, resData.localId);
      setTimeout(() => {
        this.store.dispatch(setRegiset())
      }, 1000);
    }));

  }

  resetPassword(email: string, newPassword: string) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.apiKey}`, {
      email: email,
      newPassword: newPassword,
      requestType: 'PASSWORD_RESET',
    });
  }

  login(form: { email: string, password: string }) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, {
      email: form.email, password: form.password, returnSecureToken: true
    }).pipe(tap((resData: AuthResponseData) => {
      const id = JSON.parse(localStorage.getItem('id'));
      this.handleAuthentication(resData.email, id, resData.idToken, +resData.expiresIn, id);

      if (localStorage.getItem('userData')) {
        const id = JSON.parse(localStorage.getItem('userData'))
        this.store.dispatch(newUserID({ id: id.localId }))
        this.store.dispatch(startGetData({ data: true }))
      }
    }));
  }

  deleteUser() {
    const id = JSON.parse(localStorage.getItem('id'));
    this.backendService.removeUser(id)
    const idToken = JSON.parse(localStorage.getItem('userData'))._token;
    const apiKey = environment.apiKey;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const body = {
      idToken: idToken
    };

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`, body, httpOptions).subscribe(() => {
      this.logout();
      localStorage.removeItem('save');
      localStorage.removeItem('isRegister');
      localStorage.removeItem('id');
      this.router.navigate(['/register']).then();
    })
  }

  logout() {
    this.user.next(null)
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
      localId: string
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return
    }

    const loaderUser: User = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate), userData.localId);
    if (loaderUser.token) {
      this.user.next(loaderUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number, localId: string) {
    this.autoLogout(expiresIn * 1000);
    const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationData, localId);
    this.user.next(user)

    localStorage.setItem('userData', JSON.stringify(user))
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }
}
