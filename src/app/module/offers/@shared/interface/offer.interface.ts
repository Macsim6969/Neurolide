export interface OfferInterface {
  id: number
  name: string
  link: string
  brand: string
  payments: number
  balance: number
  payout: string
  vip: boolean,
  statusOffer?: string,
  isAdvertice?: boolean
}

export interface OffersFormsData {
  title: string
  name: string
  link: string
  brand: string
  payments: string
  balance: string
  model: string
  cancel: string
  save: string
  status: string
  advertise: string
  payout: string
}