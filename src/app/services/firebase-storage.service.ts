import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  private storage = getStorage(initializeApp(environment.firebaseConfig));

  constructor() {}

  async uploadImage(file: File, filePath: string): Promise<string> {
    const storageRef = ref(this.storage, filePath);
    
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async getImageURLs(directoryPath: string): Promise<string[]> {
    const storageRef = ref(this.storage, directoryPath);
    const result = await listAll(storageRef);
    const urls = await Promise.all(result.items.map(itemRef => getDownloadURL(itemRef)));
    return urls;
  }
}
