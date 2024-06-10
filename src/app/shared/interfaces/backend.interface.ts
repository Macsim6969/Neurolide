export interface UserData{
  name: string
  userID?: string
  email: string
  password: string
  address?: string
  number?: string
  avatar?: string
  rules: string
  token: string
}

export interface PeyementList{
  UI_id: number
  name: string
  country: string
  payement_id: string
  number: number

  pay?: number
  oscillate?: number
  status?: string

}
