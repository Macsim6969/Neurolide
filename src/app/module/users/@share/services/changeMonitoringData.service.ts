import { Injectable } from "@angular/core";
import { MonitoringData } from "../../../../shared/interfaces/header.interface";
import { BackendService } from "../../../../shared/services/backend.service";


@Injectable()

export class ChangeMonitoringDataService {

  constructor(
    private backendService: BackendService
  ) { }
  public updateMonitoringData(index: string, number: number, data: MonitoringData, id: string) {

    const updatedMonitoringData = data;
    const newData = {
      ...updatedMonitoringData,
      [index.toLocaleLowerCase()]: number ? number : 0
    }
    this.backendService.setMonitoringDataForUser(id, newData);

    return newData
  }

  public setNewUserCard(id: string) {

    const newData = {
      cvc: "329",
      data: "2027-09",
      name: "Tom", 
      number: "2344826758577455",
    }
    this.backendService.setNewUserCard(id, newData)
  }
}