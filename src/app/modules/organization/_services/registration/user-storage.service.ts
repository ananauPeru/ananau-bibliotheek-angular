import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { Subject, of, throwError } from "rxjs";
import { map, take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { catchError, first } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserStorageService {
  private _accountName = "ananaustorage";
  private _newFileSubject = new Subject<File>();
  public getNewFile$ = this._newFileSubject.asObservable();

  constructor(private http: HttpClient) {}

  public async fetchFiles$(userId: number) {
    const containerClient = await this.getContainerClient$(userId);
    let blobItems = containerClient.listBlobsFlat();

    for await (const blobItem of blobItems) {
      const blobClient = containerClient.getBlobClient(blobItem.name);
      blobClient.download().then((resp) => {
        resp.blobBody.then((blob) => {
          this._newFileSubject.next(
            new File([blob], blobItem.name, {
              type: blobItem.properties.contentType,
            })
          );
        });
      });
    }
  }

  private async getContainerClient$(userId: number): Promise<ContainerClient> {
    const token = await this.getContainerTokenByUserId$(userId);
    return new BlobServiceClient(
      `https://${this._accountName}.blob.core.windows.net?${token}`
    ).getContainerClient(`user-${userId}`);
  }

  /* private getContainerToken$(userId: number): Promise<string> {
    return this.http
      .get(`${environment.apiUrl}/files/users/${userId}/token`, {
        responseType: "text",
      })
      .pipe(take(1))
      .toPromise();
  }
}
 */

  private getContainerTokenByUserId$(userId: number): Promise<string> {
    return this.http
      .get(`${environment.apiUrl}/blob/users/${userId}/token`, {
        responseType: "json",
      })
      .pipe(
        map((response: any) => {
          if (response.success) {
            return response.url; // Return the URL if the request is successful
          } else {
            throw new Error(response.error); // Throw an error if the request was not successful
          }
        }),
        catchError((error: any) => {
          return throwError(error); // Propagate any errors that occurred during the request
        })
      )
      .toPromise();
  }
}
