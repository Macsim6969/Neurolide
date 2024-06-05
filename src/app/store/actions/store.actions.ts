import { createAction, props } from "@ngrx/store"
import { UserData } from "../../shared/interfaces/backend.interface"


export const USERID = 'USERID'
export const USERDATA = 'USERDATA'

export const newUserID = createAction(
  USERID,
  props<{id: string}>()
)

export const newUserData = createAction(
  USERDATA,
  props<{data: UserData}>()
)