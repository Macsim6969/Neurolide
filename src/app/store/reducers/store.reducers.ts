import { createReducer, on } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { allUsers, newUserData, newUserID, updatedMonitoringData } from "../actions/store.actions";


export const store: StoreInterface = {
  allUsers: null,
  idUser: null,
  userData: null,
  monitoringData: null
}

export const storeReducers = createReducer(store,
  on(allUsers, (state, action) => {
    return { ...state, allUsers: action.data }
  }),
  on(newUserID, (state, action) => {
    return { ...state, idUser: action.id }
  }),
  on(newUserData, (state, action) => {
    return { ...state, userData: action.data }
  }),
  on(updatedMonitoringData, (state, action) => {
    return { ...state, monitoringData: action.data }
  })
)

