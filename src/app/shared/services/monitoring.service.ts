import { Injectable } from "@angular/core";
import { MonitoringData } from "../interfaces/header.interface";
import { BackendService } from "./backend.service";

@Injectable()

export class MonitoringService {

  constructor(
    private backendService: BackendService
  ) { }
  public checkRules(id: string, rule: string) {
    if (rule === 'manager') {
      this.monitoringForManager(id)
    } else if (rule === 'brand') {
      this.monitoringForBrand(id)
    } else if (rule === 'affiliate') {
      this.monitoringForAffiliat(id);
    }
  }

  private monitoringForManager(id: string) {
    const data: MonitoringData = {
      index: 0,
      enrollment: 0,
      budget: 0,
      balance: 0,
      advice: 0,
      transactions: 0
    }
    this.backendService.setMonitoringData(id, data);
  }

  private monitoringForBrand(id: string) {
    const data: MonitoringData = {
      leads: 0,
      disregard: 0,
      approve: 0,
      balance: 0,
      advice: 0,
      transactions: 0
    }
    this.backendService.setMonitoringData(id, data);
  }

  private monitoringForAffiliat(id: string) {
    const data: MonitoringData = {
      cliques: 0,
      hold: 0,
      accrual: 0,
      balance: 0,
      advice: 0,
      transactions: 0
    }
    this.backendService.setMonitoringData(id, data);
  }
}
