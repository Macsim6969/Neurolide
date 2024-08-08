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
import { Database, onValue, ref } from 'firebase/database';

@Injectable()

export class BackendService {
  private baseUrl = 'https://neurolide-ee476-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,
    private db: Database) {
      this.setupRealtimeListeners();
  }

  private setupRealtimeListeners() {
    // Tracking users
    const usersRef = ref(this.db, 'users');
    onValue(usersRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        this.store.dispatch(allUsers({ data: userData }));
      }
    });

    // Tracking profile
    const userProfilesRef = ref(this.db, 'users');
    onValue(userProfilesRef, (snapshot) => {
      const profilesData = snapshot.val();
      if (profilesData) {
        Object.keys(profilesData).forEach(userId => {
          const userProfile = profilesData[userId]['profile'];
          if (userProfile) {
            this.store.dispatch(newUserData({ data: userProfile }));
          }
        });
      }
    });

    // Tracking monitoring
    const monitoringRef = ref(this.db, 'users');
    onValue(monitoringRef, (snapshot) => {
      const monitoringData = snapshot.val();
      if (monitoringData) {
        Object.keys(monitoringData).forEach(userId => {
          const data = monitoringData[userId]['monitoring'];
          if (data) {
            this.store.dispatch(updatedMonitoringData({ data }));
          }
        });
      }
    });

    // Tracking card
    const cardsPaymentRef = ref(this.db, 'users');
    onValue(cardsPaymentRef, (snapshot) => {
      const cardsData = snapshot.val();
      if (cardsData) {
        Object.keys(cardsData).forEach(userId => {
          const data = cardsData[userId]['card'];
          if (data) {
            this.store.dispatch(setCardsPayment({ data }));
          }
        });
      }
    });

    // Tracking cardTransaction
    const cardsTransactionRef = ref(this.db, 'users');
    onValue(cardsTransactionRef, (snapshot) => {
      const transactionsData = snapshot.val();
      if (transactionsData) {
        Object.keys(transactionsData).forEach(userId => {
          const data = transactionsData[userId]['cardTransaction'];
          if (data) {
            this.store.dispatch(setCardsTransaction({ data }));
          }
        });
      }
    });

    // Tracking media-channels
    const mediaChannelsRef = ref(this.db, 'media-channels');
    onValue(mediaChannelsRef, (snapshot) => {
      const mediaChannelsData = snapshot.val();
      if (mediaChannelsData) {
        this.store.dispatch(setMediaChannelsData({ data: Object.values(mediaChannelsData) }));
      }
    });

    // Tracking offers
    const offersRef = ref(this.db, 'offers');
    onValue(offersRef, (snapshot) => {
      const offersData = snapshot.val();
      if (offersData) {
        this.store.dispatch(setOffersData({ data: Object.values(offersData) }));
      }
    });

    // Tracking active proposals
    const activeOffersRef = ref(this.db, 'active-offers');
    onValue(activeOffersRef, (snapshot) => {
      const activeOffersData = snapshot.val();
      if (activeOffersData) {
        this.store.dispatch(setToActiveOffer({ offer: activeOffersData }));
      }
    });
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
    return this.http.delete<UserData>(`${this.baseUrl}/users/${userId}.json`).subscribe(() => {
      this.getAlluser();
    })
  }

  public getUserProfile(userId: string) {
    return this.http.get<UserData>(`${this.baseUrl}/users/${userId}/profile.json`).subscribe((data: UserData) => {
      data ? this.store.dispatch(newUserData({ data: data })) : null
    });
  }

  public getMonitoringData(userId: string) {
    return this.http.get<MonitoringData>(`${this.baseUrl}/users/${userId}/monitoring.json`).subscribe((data: MonitoringData) => {
      data ? this.store.dispatch(updatedMonitoringData({ data: data })) : null;
    })
  }

  public setMonitoringData(userId: string, data: MonitoringData) {
    return this.http.put<MonitoringData>(`${this.baseUrl}/users/${userId}/monitoring.json`, data).subscribe((data: MonitoringData) => {
      this.store.dispatch(updatedMonitoringData({ data: data }));
    })
  }

  public setMonitoringDataForUser(userId: string, data: MonitoringData) {
    return this.http.put<MonitoringData>(`${this.baseUrl}/users/${userId}/monitoring.json`, data).subscribe((data: MonitoringData) => {
      this.getAlluser();
    })
  }

  public getAlluser() {
    return this.http.get<any>(`${this.baseUrl}/users.json`).subscribe((data: UserData) => {
      data ? this.store.dispatch(allUsers({ data: data })) : null;
    });
  }

  public setNewUserCard(userId: string, newCard) {
    return this.http.post<MonitoringData>(`${this.baseUrl}/users/${userId}/card.json`, newCard).subscribe(() => {
      this.getAlluser();
    })
  }

  public setUserTransitionHistory(userId: string, newTransactions) {
    return this.http.put<MonitoringData>(`${this.baseUrl}/users/${userId}/transactions.json`, newTransactions).subscribe(() => {
      this.getAlluser();
    })
  }

  public getCardsPayment(userId: string) {
    return this.http.get<CardsPayment[]>(`${this.baseUrl}/users/${userId}/card.json`).subscribe((data: CardsPayment[]) => {
      data ? this.store.dispatch(setCardsPayment({ data: data })) : null
    })
  }

  public setCardsPayment(userId: string, newCard: CardsPayment) {
    return this.http.post<CardsPayment[]>(`${this.baseUrl}/users/${userId}/card.json`, newCard).subscribe(() => {
      this.getCardsPayment(userId);
    })
  }

  public updateCardsPayment(userId: string, idKey: string, newCard: CardsPayment) {
    return this.http.put<CardsPayment[]>(`${this.baseUrl}/users/${userId}/card/${idKey}.json`, newCard).subscribe(() => {
      this.getCardsPayment(userId);
    })
  }

  public setCardsTransactions(userId: string, data: TransactionInterface) {
    return this.http.post<TransactionInterface>(`${this.baseUrl}/users/${userId}/cardTransaction.json`, data).subscribe(() => {
      this.getCardsTransactions(userId);
    })
  }

  public getCardsTransactions(userId: string) {
    return this.http.get<TransactionInterface[]>(`${this.baseUrl}/users/${userId}/cardTransaction.json`).subscribe((data: TransactionInterface[]) => {
      data ? this.store.dispatch(setCardsTransaction({ data: data })) : null;
    })
  }

  public setNewMediaChannels(data: MediaFormInterface) {
    return this.http.post<MediaFormInterface>(`${this.baseUrl}/media-channels.json`, data).subscribe(() => {
      this.getMediaChannels();
    })
  }

  public setMediaChannels(user: string, data: MediaFormInterface) {
    return this.http.put<MediaFormInterface>(`${this.baseUrl}/media-channels/${user}.json`, data).subscribe(() => {
      this.getMediaChannels();
    })
  }

  public getMediaChannels() {
    return this.http.get<MediaFormInterface[]>(`${this.baseUrl}/media-channels.json`).subscribe((data: MediaFormInterface[]) => {
      data ? this.store.dispatch(setMediaChannelsData({ data: data })) : null;
    })
  }

  public removeMediaChannels(user: string) {
    return this.http.delete<MediaFormInterface[]>(`${this.baseUrl}/media-channels/${user}.json`).subscribe(() => {
      this.getMediaChannels()
    })
  }


  public setNewOffers(data: OfferInterface) {
    return this.http.post<OfferInterface>(`${this.baseUrl}/offers.json`, data).subscribe(() => {
      this.getOffers();
    })
  }

  public getOffers() {
    return this.http.get<OfferInterface[]>(`${this.baseUrl}/offers.json`).subscribe((data: OfferInterface[]) => {
      data ? this.store.dispatch(setOffersData({ data: data })) : null;
    })
  }

  public updateOffers(user: string, data: OfferInterface) {
    return this.http.put<OfferInterface>(`${this.baseUrl}/offers/${user}.json`, data).subscribe(() => {
      this.getOffers();
    })
  }

  public removeOffers(user: string) {
    return this.http.delete<OfferInterface[]>(`${this.baseUrl}/offers/${user}.json`).subscribe((data: OfferInterface[]) => {
      this.getOffers()
    })
  }

  public setToActiveOffer(data: OfferInterface) {
    return this.http.post<OfferInterface>(`${this.baseUrl}/active-offers.json`, data).subscribe(() => {
      this.getFromActiveOffer();
    })
  }

  public getFromActiveOffer() {
    return this.http.get<OfferInterface[]>(`${this.baseUrl}/active-offers.json`).subscribe((data: OfferInterface[]) => {
      this.store.dispatch(setToActiveOffer({ offer: data }));
    })
  }

}
