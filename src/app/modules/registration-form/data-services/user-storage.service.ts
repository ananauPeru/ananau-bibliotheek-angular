import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../../auth";
import { ScansFile } from "../models/scans-file";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserStorageService {
  private _accountName = "ananaustorage";
  private _containerName: string;
  private _newFileSubject = new Subject<ScansFile>();
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

  public async fetchImagesByUserId$(id: string) {
    const containerClient = await this.getContainerClientByUserId$(id);
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

  private async getContainerClientByUserId$(id: string): Promise<ContainerClient> {
    const token = await this.getContainerTokenByUserId$(id);
    return new BlobServiceClient(
      `https://${this._accountName}.blob.core.windows.net?${token}`
    ).getContainerClient(this._containerName);
  }

  private getContainerToken$(): Promise<string> {
    return this.http
      .get(`${environment.apiUrl}/blob/users/current/token`, {
        responseType: "text",
      })
      .pipe(take(1))
      .toPromise();
  }

  private getContainerTokenByUserId$(id: string): Promise<string> {
    return this.http
      .get(`${environment.apiUrl}/files/${id}/current/token`, {
        responseType: "text",
      })
      .pipe(take(1))
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
