import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MediaFormInterface } from "../interface/mediaForm.interface";
import { BackendService } from "../../../../shared/services/backend.service";


@Injectable()

export class MediaFormService {

  private isMediaFormSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private backendService: BackendService
  ) { }

  set _isMediaForm(value: boolean) {
    this.isMediaFormSubject.next(value);
  }

  get _isMediaForm$() {
    return this.isMediaFormSubject;
  }

  public sendMediaChannelsData(newForm: MediaFormInterface) {
    const id = JSON.parse(localStorage.getItem('id'))
    const newMediaChannels: MediaFormInterface = {
      id: '',
      name: newForm.name,
      link: '',
      subscribe: newForm.subscribe,
      stream: newForm.stream,
      payout: 'CPM',
      price: newForm.price
    }

    this.backendService.setMediaChannels(id, newMediaChannels)
  }
}