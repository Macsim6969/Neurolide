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
}