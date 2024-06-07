import { createAction, props } from "@ngrx/store"
import { UserData } from "../../shared/interfaces/backend.interface"
import { MonitoringData } from "../../shared/interfaces/header.interface"


export const USERID = 'USERID';
export const USERDATA = 'USERDATA';
export const MONITORINGDATA = 'MONITORINGDATA';
export const STARTAFFECT = 'STARTAFFECT';

export const newUserID = createAction(
  USERID,
  props<{ id: string }>()
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