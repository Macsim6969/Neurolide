import { createReducer, on } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { newUserData, newUserID, updatedMonitoringData } from "../actions/store.actions";


export const store: StoreInterface = {
  idUser: null,
  userData: null,
  monitoringData: null
}

export const storeReducers = createReducer(store,
  on(newUserID, (state, action) => {
    return { ...state, idUser: action.id }
  }),
  on(newUserData, (state, action) =>{
    return {...state, userData: action.data}
  }),
  on(updatedMonitoringData, (state, action) =>{
    return {...state, monitoringData: action.data}
  })
)

