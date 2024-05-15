import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const IMAGE_FILE_EXTENSIONS: string[] = ['jpg', 'png', 'jpeg'];
const AUDIO_FILE_EXTENSIONS: string[] = ['mp3', 'wav'];

@Injectable({
  providedIn: 'root'
})
export class FileUtil {


  /**
   * Converts a file url to a File object
   * @param url the url of the file to be converted to a File object
   * @returns an observable of the File object
   */
  public urlToFile(url: string): Observable<File> {
    const fileName = url.split("/").pop();
    return from(fetch(url)).pipe(
      switchMap(res => from(res.blob())),
      switchMap(blob => {
        const mime = blob.type;
        const ext = mime.slice(mime.lastIndexOf("/") + 1, mime.length);
        const file = new File([blob], fileName, {
          type: mime,
        });
        return of(file);
      })
    );
  }

  /**
   * Returns true if the file is an image file, false otherwise
   * @param fileUrl the url of the file to be checked
   * @returns true if the file is an image file, false otherwise
   */
  public isImageFile(fileUrl: string): boolean {
    return IMAGE_FILE_EXTENSIONS.includes(this.getFileExtension(fileUrl));
  }

  /**
   * Returns true if the file is an audio file, false otherwise
   * @param fileUrl the url of the file to be checked
   * @returns true if the file is an audio file, false otherwise
   */
  public isAudioFile(fileUrl: string): boolean {
    return AUDIO_FILE_EXTENSIONS.includes(this.getFileExtension(fileUrl));
  }

  private getFileExtension(fileUrl: string): string {
    return fileUrl.split('.').pop();
  }
}