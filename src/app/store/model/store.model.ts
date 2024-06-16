import { TransactionInterface } from "../../module/balance/@shared/interface/transactions.interface"
import { CardsPayment, UserData } from "../../shared/interfaces/backend.interface"
import { MonitoringData } from "../../shared/interfaces/header.interface"

export interface StoreInterface {
  allUsers: any[]
  idUser: string
  userData: UserData
  monitoringData: MonitoringData
  cardsPayment: CardsPayment[]
  cardsTransactions: TransactionInterface[]
}
