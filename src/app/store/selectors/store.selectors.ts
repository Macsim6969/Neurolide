import { StoreInterface } from "../model/store.model";

export const selectMonitoringData = (store: {store: StoreInterface}) => store.store.monitoringData;
export const selectUserId = (store : {store: StoreInterface}) => store.store.idUser;
export const selectUserData = (store: {store: StoreInterface}) => store.store.userData;

export const selectAllUsers = (store: {store: StoreInterface}) => store.store.allUsers;

export const selectStore = (store : {store: StoreInterface}) => store.store;

export const selectCardsPayments = (store : {store: StoreInterface}) => store.store.cardsPayment;
export const selectCardTransactions = (store: {store: StoreInterface}) => store.store.cardsTransactions;
export const selectMediaChannels = (store: {store: StoreInterface}) => store.store.mediaChannels;
export const selectOffersData = (store: {store:StoreInterface}) => store.store.offers;

export const selectAddedOffers = (store: {store: StoreInterface}) => store.store.addedOffers;
export const selectActiveOffers = (store: {store: StoreInterface}) => store.store.activeOffers;