

export interface User{
  userInfo: UserData[]
  userActions: UserActions[]
  userLogoutChanges: UserActions[]
}
export interface UserData {
  text: string
  data: string
  key: string
}

export interface UserActions{
  text: string
  class: string
}