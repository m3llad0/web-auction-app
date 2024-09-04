// FirebaseStorageService.ts
import { storage } from '../../../firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

class FirebaseStorageService {
  async uploadFile(file: File): Promise<string | null> {
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Uploaded file and got download URL:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }

  async getImageUrl(fileName: string): Promise<string | null> {
    const storageRef = ref(storage, `images/${fileName}`);

    try {
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error getting download URL:', error);
      return null;
    }
  }
}

const firebaseStorageService = new FirebaseStorageService();

export default firebaseStorageService;
