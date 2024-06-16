import { createAction, props } from "@ngrx/store"
import { CardsPayment, UserData } from "../../shared/interfaces/backend.interface"
import { MonitoringData } from "../../shared/interfaces/header.interface"
import { TransactionInterface } from "../../module/balance/@shared/interface/transactions.interface"

export const SETALLUSERS = 'SETALLUSERS'
export const REGISTER = 'REGISTER'
export const USERS = 'USERS'
export const USERID = 'USERID';
export const USERDATA = 'USERDATA';
export const MONITORINGDATA = 'MONITORINGDATA';
export const STARTAFFECT = 'STARTAFFECT';
export const SETUSERDATA = 'SETUSERDATA';
export const CARDSPAYMENT = 'CARDSPAYMENT';
export const CARDSTRANSACTIONS = 'CARDSTRANSACTIONS';

export const setAllUsers = createAction(
  SETALLUSERS
)
export const setRegiset = createAction(
  REGISTER
)

export const newUserID = createAction(
  USERID,
  props<{ id: string }>()
)

export const allUsers = createAction(
  USERS,
  props<{ data: any }>()
)

export const newUserData = createAction(
  USERDATA,
  props<{ data: UserData }>()
)

export const updatedMonitoringData = createAction(
  MONITORINGDATA,
  props<{ data: MonitoringData }>()
)

export const startGetData = createAction(
  STARTAFFECT,
  props<{ data: boolean }>()
)

export const setUserData = createAction(
  SETUSERDATA,
  props<{ data: boolean }>()
)

export const setCardsPayment = createAction(
  CARDSPAYMENT,
  props<{data: CardsPayment[]}>()
)

export const setCardsTransaction = createAction(
  CARDSTRANSACTIONS,
  props<{data: TransactionInterface[]}>()
)