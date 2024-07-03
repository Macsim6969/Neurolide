import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FirebaseStorageService } from "../../../../services/firebase-storage.service";

@Injectable()
export class ProfileServices {

  private isPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private firebaseStorageService: FirebaseStorageService) { }

  set _isPopup(value: boolean) {
    this.isPopupSubject.next(value);
  }

  get _isPopup$() {
    return this.isPopupSubject.asObservable();
  }

  public async onGetImage(storeData): Promise<string> {
    const imageUrl = await this.firebaseStorageService.getImageURLs('gs://neuroline-af6a2.appspot.com/images');
    const ourUrl = storeData.avatar;
    const final = imageUrl.find(e => e.includes(ourUrl));
    return final;
  }
}
