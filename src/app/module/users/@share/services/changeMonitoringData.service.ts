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
      [index.toLocaleLowerCase()]: number
    }
    console.log(newData)
  this.backendService.setMonitoringDataForUser(id, newData);

    return newData

  }
}