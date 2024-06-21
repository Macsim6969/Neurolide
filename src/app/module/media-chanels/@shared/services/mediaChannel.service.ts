import { Injectable } from "@angular/core";
import { BackendService } from "../../../../shared/services/backend.service";
import { MediaFormInterface } from "../interface/mediaForm.interface";


@Injectable()

export class MediaChannelService {

  constructor(
    private backendService: BackendService
  ) { }

  public removeMedia(mediaChannels: MediaFormInterface[], mainData: MediaFormInterface[], id: string) {
    const userId = JSON.parse(localStorage.getItem('id'))
    const media = mediaChannels.find((e: MediaFormInterface) => e.id === id)
    const blockId = Object.keys(mainData).find(key => mainData[key] === media)
    this.backendService.removeMediaChannels(userId, blockId);
  }

  public setVipStatus(mediaChannels: MediaFormInterface[], mainData: MediaFormInterface[], id: string) {
    const userId = JSON.parse(localStorage.getItem('id'))
    const media = mediaChannels.find((e: MediaFormInterface) => e.id === id)
    const blockId = Object.keys(mainData).find(key => mainData[key] === media)
    const newData: MediaFormInterface = {
      ...media,
      vip: !media.vip
    }
    this.backendService.setMediaChannels(userId, blockId, newData);
  }

  public setNewChanges(mediaChannels: MediaFormInterface[], mainData: MediaFormInterface[], id: string, newStatus: string) {
    const userId = JSON.parse(localStorage.getItem('id'))
    const media = mediaChannels.find((e: MediaFormInterface) => e.id === id)
    const blockId = Object.keys(mainData).find(key => mainData[key] === media)
    const newData: MediaFormInterface = {
      ...media,
      payout: newStatus
    }
    this.backendService.setMediaChannels(userId, blockId, newData);
  }

  public setNewChangesFromForm(mediaChannels: MediaFormInterface, mainData: MediaFormInterface[]) {
    const userId = JSON.parse(localStorage.getItem('id'));
    const blockId = Object.keys(mainData).find(key => mainData[key].id === mediaChannels.id);
    this.backendService.setMediaChannels(userId, blockId, mediaChannels);
  }
}