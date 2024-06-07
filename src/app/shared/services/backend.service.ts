import { newUserData, updatedMonitoringData } from './../../store/actions/store.actions';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserData } from "../interfaces/backend.interface";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../store/model/store.model";
import { MonitoringData } from '../interfaces/header.interface';

@Injectable()

export class BackendService {
  private baseUrl = 'https://neuroline-af6a2-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,) {
  }
public sendUserProfile(userData: UserData) {
    return this.http.post<UserData>(`${this.baseUrl}/users/${userData.userID}/profile.json`, userData).subscribe();
  }

  public getUserProfile(userId: string) {
    return this.http.get<UserData>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/profile.json`).subscribe((data: UserData) => {
      this.store.dispatch(newUserData({ data: data }));
    });
  }

  public getMonitoringData(userId: string){
    return this.http.get<MonitoringData>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/monitoring.json`).subscribe((data: MonitoringData) =>{
      this.store.dispatch(updatedMonitoringData({data: data}));
    })
  }

}
