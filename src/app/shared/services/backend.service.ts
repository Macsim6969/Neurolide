import { allUsers, newUserData, setAllUsers, setCardsPayment, setUserData, updatedMonitoringData } from './../../store/actions/store.actions';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CardsPayment, UserData } from "../interfaces/backend.interface";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../store/model/store.model";
import { MonitoringData } from '../interfaces/header.interface';

@Injectable({ providedIn: 'root' })

export class BackendService {
  private baseUrl = 'https://neuroline-af6a2-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,) {
  }

  public updateUserData(userData) {
    return this.http.put<UserData>(`${this.baseUrl}/users/${userData.profile.userID}.json`, userData).subscribe(() => {
      this.getAlluser();
    });
  }

  public sendUserProfile(userData: UserData) {
    return this.http.put<UserData>(`${this.baseUrl}/users/${userData.userID}/profile.json`, userData).subscribe(() => {
      this.store.dispatch(setUserData({ data: true }));
    });
  }

  public removeUser(userId: string) {
    return this.http.delete<UserData>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}.json`).subscribe(() => {
      this.getAlluser();
    })
  }

  public getUserProfile(userId: string) {
    return this.http.get<UserData>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/profile.json`).subscribe((data: UserData) => {
      this.store.dispatch(newUserData({ data: data }));
    });
  }

  public getMonitoringData(userId: string) {
    return this.http.get<MonitoringData>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/monitoring.json`).subscribe((data: MonitoringData) => {
      this.store.dispatch(updatedMonitoringData({ data: data }));
    })
  }

  public setMonitoringData(userId: string, data: MonitoringData) {
    return this.http.put<MonitoringData>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/monitoring.json`, data).subscribe((data: MonitoringData) => {
      this.store.dispatch(updatedMonitoringData({ data: data }));
    })
  }

  public setMonitoringDataForUser(userId: string, data: MonitoringData) {
    return this.http.put<MonitoringData>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/monitoring.json`, data).subscribe((data: MonitoringData) => {
      this.getAlluser();
    })
  }

  public getAlluser() {
    return this.http.get<any>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users.json`).subscribe((data: UserData) => {
      this.store.dispatch(allUsers({ data: data }));
    });
  }

  public setNewUserCard(userId: string, newCard) {
    return this.http.post<MonitoringData>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/card.json`, newCard).subscribe(() => {
      this.getAlluser();
    })
  }

  public setUserTransitionHistory(userId: string, newTransactions) {
    return this.http.put<MonitoringData>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/transactions.json`, newTransactions).subscribe(() => {
      this.getAlluser();
    })
  }

  public getCardsPayment(userId: string) {
    return this.http.get<CardsPayment[]>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/card.json`).subscribe((data: CardsPayment[]) => {
      this.store.dispatch(setCardsPayment({ data: data }));
    })
  }

  public setCardsPayment(userId: string, newCard: CardsPayment) {
    console.log(newCard)
    return this.http.post<CardsPayment[]>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/card.json`, newCard).subscribe(() => {
      this.getCardsPayment(userId);
    })
  }
}
