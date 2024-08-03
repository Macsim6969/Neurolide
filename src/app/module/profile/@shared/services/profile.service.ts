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
    const imageUrl = await this.firebaseStorageService.getImageURLs('gs://neurolide-ee476.appspot.com/images');
    const ourUrl = storeData.avatar;
    const final = imageUrl.find(e => e.includes(ourUrl));
    return final;
  }

  public async updateProfilePhoto(newPhoto: File, oldPhotoUrl?: string): Promise<string> {
    if (oldPhotoUrl) {
      const filePath = this.getFilePathFromUrl(oldPhotoUrl);
      await this.firebaseStorageService.deleteImage(filePath);
    }
    const filePath = `images/${newPhoto.name}`;
    const newPhotoUrl = await this.firebaseStorageService.uploadImage(newPhoto, filePath);
    return newPhotoUrl;
  }

  private getFilePathFromUrl(url: string): string {
    const storageRootUrl = 'https://firebasestorage.googleapis.com/v0/b/neuroline-c426d.appspot.com/o/';
    return decodeURIComponent(url.replace(storageRootUrl, '').split('?')[0]);
  }


}
