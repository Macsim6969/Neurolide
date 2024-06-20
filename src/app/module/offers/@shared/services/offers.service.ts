import { Injectable } from "@angular/core";
import { BackendService } from "../../../../shared/services/backend.service";
import { OfferInterface } from "../interface/offer.interface";



@Injectable()

export class OffersService {

  constructor(
    private backendService: BackendService
  ) { }

  public removeOffers(mediaChannels: OfferInterface[], mainData: OfferInterface[], id: number) {
    const userId = JSON.parse(localStorage.getItem('id'))
    const media = mediaChannels.find((e: OfferInterface) => e.id === id)
    const blockId = Object.keys(mainData).find(key => mainData[key] === media)
    this.backendService.removeOffers(userId, blockId);
  }

  public setVipStatus(mediaChannels: OfferInterface[], mainData: OfferInterface[], id: number) {
    const userId = JSON.parse(localStorage.getItem('id'))
    const media = mediaChannels.find((e: OfferInterface) => e.id === id)
    const blockId = Object.keys(mainData).find(key => mainData[key] === media)
    const newData: OfferInterface = {
      ...media,
      vip: !media.vip
    }
    this.backendService.updateOffers(userId, blockId, newData);
  }

  public setNewChanges(mediaChannels: OfferInterface[], mainData: OfferInterface[], id: number, newStatus: string) {
    const userId = JSON.parse(localStorage.getItem('id'))
    const media = mediaChannels.find((e: OfferInterface) => e.id === id)
    const blockId = Object.keys(mainData).find(key => mainData[key] === media)
    const newData: OfferInterface = {
      ...media,
      payout: newStatus
    }
    this.backendService.updateOffers(userId, blockId, newData);
  }
}