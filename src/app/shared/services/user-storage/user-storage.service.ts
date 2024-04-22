import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { Subject, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";
import { ScansFile } from "src/app/modules/registration-form/models/scans-file";
import { AuthService } from "src/app/modules/auth";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private _accountName = "ananaustorage";
  private _containerName: string;
  private _newFileSubject = new Subject<File>();
  public getNewFile$ = this._newFileSubject.asObservable();

  constructor(private http: HttpClient, authService: AuthService) {
    this._containerName = `user-${authService.currentUserValue.id}`;
  }

  public async fetchImages$() {
    const containerClient = await this.getContainerClient$();
    let blobItems = containerClient.listBlobsFlat();

    for await (const blobItem of blobItems) {
      const blobClient = containerClient.getBlobClient(blobItem.name);
      blobClient.download().then((resp) => {
        resp.blobBody.then((blob) => {
          const file = this.createOldScansFile(blob, blobItem.name);
          this._newFileSubject.next(file);
        });
      });
    }
  }

  public async fetchFiles$(userId: number) {
    const containerClient = await this.getContainerClientByUserId$(userId);
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

  private async getContainerClientByUserId$(userId: number): Promise<ContainerClient> {
    const token = await this.getContainerTokenByUserId$(userId);
    return new BlobServiceClient(
      `https://${this._accountName}.blob.core.windows.net?${token}`
    ).getContainerClient(`user-${userId}`);
  }

  public async storeImages$(files: ScansFile[]) {
    const containerClient = await this.getContainerClient$();
    for await (const file of files) {
      containerClient.getBlockBlobClient(file.uniqueName).uploadData(file, {
        blobHTTPHeaders: { blobContentType: file.type },
      });
    }
  }

  public async deleteImages$(files: ScansFile[]) {
    const containerClient = await this.getContainerClient$();
    for await (const file of files) {
      containerClient.deleteBlob(file.uniqueName, {
        deleteSnapshots: "include",
      });
    }
  }

  private async getContainerClient$(): Promise<ContainerClient> {
    const token = await this.getContainerToken$();
    return new BlobServiceClient(
      `https://${this._accountName}.blob.core.windows.net?${token}`
    ).getContainerClient(this._containerName);
  }

  private getContainerToken$(): Promise<string> {
    return this.http
      .get(`${environment.apiUrl}/blob/users/current/token`, {
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

  private createOldScansFile(blob: Blob, fileName: string): ScansFile {
    let b: any = blob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    b.uniqueName = fileName;
    b.isNew = false;
    return blob as ScansFile;
  }

}
