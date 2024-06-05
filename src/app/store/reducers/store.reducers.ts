import { createReducer, on } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { newUserData, newUserID } from "../actions/store.actions";


export const store: StoreInterface = {
  idUser: null,
  userData: null
}

export const storeReducers = createReducer(store,
  on(newUserID, (state, action) => {
    return { ...state, idUser: action.id }
  }),
  on(newUserData, (state, action) =>{
    return {...state, userData: action.data}
  })
)

