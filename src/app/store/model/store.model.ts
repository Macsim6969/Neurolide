import { UserData } from "../../shared/interfaces/backend.interface"
import { MonitoringData } from "../../shared/interfaces/header.interface"

export interface StoreInterface {
  allUsers: any[]
  idUser: string
  userData: UserData
  monitoringData: MonitoringData
}
