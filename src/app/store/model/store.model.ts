import { TransactionInterface } from "../../module/balance/@shared/interface/transactions.interface"
import { MediaFormInterface } from "../../module/media-chanels/@shared/interface/mediaForm.interface"
import { OfferInterface } from "../../module/offers/@shared/interface/offer.interface"
import { CardsPayment, UserData } from "../../shared/interfaces/backend.interface"
import { MonitoringData } from "../../shared/interfaces/header.interface"

export interface StoreInterface {
  allUsers: any[]
  idUser: string
  userData: UserData
  monitoringData: MonitoringData
  cardsPayment: CardsPayment[]
  cardsTransactions: TransactionInterface[]
  mediaChannels: MediaFormInterface[]
  offers: OfferInterface[]
}
