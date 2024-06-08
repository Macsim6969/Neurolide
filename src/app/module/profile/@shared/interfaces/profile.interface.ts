

export interface User {
  userInfo: UserData[]
  userActions: UserActions[]
  userLogoutChanges: UserActions[]
}
export interface UserData {
  text: string
  data: string
  key: string
}

export interface UserActions {
  text: string
  class: string
}

export interface UserInfo {
  userID: string
  name: string
  address: string
  number: number
  password: string
  doublePassword?: string
  email: string
  image: string
  rules: string
}