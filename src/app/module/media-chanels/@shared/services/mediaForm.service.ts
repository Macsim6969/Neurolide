import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MediaFormInterface } from "../interface/mediaForm.interface";
import { BackendService } from "../../../../shared/services/backend.service";


@Injectable()

export class MediaFormService {
  private usedIds: Set<string> = new Set();
  private isMediaFormSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private mediaFormDataSubject: BehaviorSubject<MediaFormInterface> = new BehaviorSubject<MediaFormInterface>(null);
  private statusModeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor(
    private backendService: BackendService
  ) { }

  set _isMediaForm(value: boolean) {
    this.isMediaFormSubject.next(value);
  }

  get _isMediaForm$() {
    return this.isMediaFormSubject;
  }

  set _mediaData(value: MediaFormInterface) {
    this.mediaFormDataSubject.next(value);
  }

  get _mediaData$() {
    return this.mediaFormDataSubject;
  }

  set _statusMOde(value: string) {
    this.statusModeSubject.next(value);
  }

  get _statusMOde$() {
    return this.statusModeSubject;
  }

  public sendMediaChannelsData(newForm: MediaFormInterface, payment: string) {
    const id = JSON.parse(localStorage.getItem('id'))
    const newMediaChannels: MediaFormInterface = {
      id: this.generateUniqueId(6),
      name: newForm.name,
      link: newForm.link,
      subscribe: newForm.subscribe,
      stream: newForm.stream,
      payout: payment,
      price: newForm.price,
      vip: false
    }

    this.backendService.setNewMediaChannels(id, newMediaChannels)
  }

  private generateUniqueId(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    do {
      id = '';
      for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (this.usedIds.has(id));

    this.usedIds.add(id);
    return id.toLocaleUpperCase();
  }
}