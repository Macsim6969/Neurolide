import { allUsers, newUserData, setCardsPayment, setCardsTransaction, setMediaChannelsData, setOffersData, setToActiveOffer, setUserData, updatedMonitoringData } from './../../store/actions/store.actions';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CardsPayment, UserData } from "../interfaces/backend.interface";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../store/model/store.model";
import { MonitoringData } from '../interfaces/header.interface';
import { TransactionInterface } from '../../module/balance/@shared/interface/transactions.interface';
import { MediaFormInterface } from '../../module/media-chanels/@shared/interface/mediaForm.interface';
import { OfferInterface } from '../../module/offers/@shared/interface/offer.interface';

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
      data ? this.store.dispatch(newUserData({ data: data })) : null
    });
  }

  public getMonitoringData(userId: string) {
    return this.http.get<MonitoringData>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/monitoring.json`).subscribe((data: MonitoringData) => {
      data ? this.store.dispatch(updatedMonitoringData({ data: data })) : null;
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
      data ? this.store.dispatch(allUsers({ data: data })) : null;
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
      data ? this.store.dispatch(setCardsPayment({ data: data })) : null
    })
  }

  public setCardsPayment(userId: string, newCard: CardsPayment) {
    return this.http.post<CardsPayment[]>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/card.json`, newCard).subscribe(() => {
      this.getCardsPayment(userId);
    })
  }

  public updateCardsPayment(userId: string, idKey: string, newCard: CardsPayment) {
    return this.http.put<CardsPayment[]>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/card/${idKey}.json`, newCard).subscribe(() => {
      this.getCardsPayment(userId);
    })
  }

  public setCardsTransactions(userId: string, data: TransactionInterface) {
    return this.http.post<TransactionInterface>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/cardTransaction.json`, data).subscribe(() => {
      this.getCardsTransactions(userId);
    })
  }

  public getCardsTransactions(userId: string) {
    return this.http.get<TransactionInterface[]>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/users/${userId}/cardTransaction.json`).subscribe((data: TransactionInterface[]) => {
      data ? this.store.dispatch(setCardsTransaction({ data: data })) : null;
    })
  }

  public setNewMediaChannels(data: MediaFormInterface) {
    return this.http.post<MediaFormInterface>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/media-channels.json`, data).subscribe(() => {
      this.getMediaChannels();
    })
  }

  public setMediaChannels(user: string, data: MediaFormInterface) {
    return this.http.put<MediaFormInterface>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/media-channels/${user}.json`, data).subscribe(() => {
      this.getMediaChannels();
    })
  }

  public getMediaChannels() {
    return this.http.get<MediaFormInterface[]>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/media-channels.json`).subscribe((data: MediaFormInterface[]) => {
      data ? this.store.dispatch(setMediaChannelsData({ data: data })) : null;
    })
  }

  public removeMediaChannels(user: string) {
    return this.http.delete<MediaFormInterface[]>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/media-channels/${user}.json`).subscribe(() => {
      this.getMediaChannels()
    })
  }


  public setNewOffers(data: OfferInterface) {
    return this.http.post<OfferInterface>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/offers.json`, data).subscribe(() => {
      this.getOffers();
    })
  }

  public getOffers() {
    return this.http.get<OfferInterface[]>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/offers.json`).subscribe((data: OfferInterface[]) => {
      data ? this.store.dispatch(setOffersData({ data: data })) : null;
    })
  }

  public updateOffers(user: string, data: OfferInterface) {
    return this.http.put<OfferInterface>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/offers/${user}.json`, data).subscribe(() => {
      this.getOffers();
    })
  }

  public removeOffers(user: string) {
    return this.http.delete<OfferInterface[]>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/offers/${user}.json`).subscribe((data: OfferInterface[]) => {
      this.getOffers()
    })
  }

  public setToActiveOffer(data: OfferInterface) {
    return this.http.post<OfferInterface>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/active-offers.json`, data).subscribe(() => {
      this.getFromActiveOffer();
    })
  }

  public getFromActiveOffer() {
    return this.http.get<OfferInterface[]>(`https://neuroline-af6a2-default-rtdb.firebaseio.com/active-offers.json`).subscribe((data: OfferInterface[]) => {
      this.store.dispatch(setToActiveOffer({ offer: data }));
    })
  }

}
