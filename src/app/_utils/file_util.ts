import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUtil {
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
}