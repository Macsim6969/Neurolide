import { StoreInterface } from "../model/store.model";

export const selectMonitoringData = (store: {store: StoreInterface}) => store.store.monitoringData;
export const selectUserId = (store : {store: StoreInterface}) => store.store.idUser;