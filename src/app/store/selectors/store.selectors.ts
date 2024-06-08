import { StoreInterface } from "../model/store.model";

export const selectMonitoringData = (store: {store: StoreInterface}) => store.store.monitoringData;
export const selectUserId = (store : {store: StoreInterface}) => store.store.idUser;
export const selectUserData = (store: {store: StoreInterface}) => store.store.userData;

export const selectAllUsers = (store: {store: StoreInterface}) => store.store.allUsers;

export const selectStore = (store : {store: StoreInterface}) => store.store;