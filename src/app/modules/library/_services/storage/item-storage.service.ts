import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import { catchError, first, take } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { ScansFile } from '../../_models/scans-file'
import { Subject, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ItemStorageService {
  private _accountName = 'ananaustorage'
  private _containerName: string
  private _newFileSubject = new Subject<ScansFile>()
  public getNewFile$ = this._newFileSubject.asObservable()

  constructor(private http: HttpClient) {
    this._containerName = 'public-images'
  }

  // public async fetchImages$() {
  //   const containerClient = await this.getContainerClient$()
  //   let blobItems = containerClient.listBlobsFlat()

  //   for await (const blobItem of blobItems) {
  //     const blobClient = containerClient.getBlobClient(blobItem.name)
  //     blobClient.download().then((resp) => {
  //       resp.blobBody.then((blob) => {
  //         const file = this.createOldScansFile(blob, blobItem.name)
  //         this._newFileSubject.next(file)
  //       })
  //     })
  //   }
  // }

  public async storeImage$(
    file: File,
    folder = 'assets',
    prefix = 'uniqueprefix',
  ): Promise<String> {
    const containerClient = await this.getContainerClient$()
    var blob = containerClient.getBlockBlobClient(
      folder + '/' + prefix + '-' + file.name,
    )
    await blob.uploadData(file, {
      blobHTTPHeaders: { blobContentType: file.type },
    })
    console.log(
      `https://${this._accountName}.blob.core.windows.net/public-images/` +
        blob.name,
    )
    return (
      `https://${this._accountName}.blob.core.windows.net/public-images/` +
      blob.name
    )
  }

  public async deleteImages$(files: ScansFile[]) {
    const containerClient = await this.getContainerClient$()
    for await (const file of files) {
      containerClient.deleteBlob(file.uniqueName, {
        deleteSnapshots: 'include',
      })
    }
  }

  private async getContainerClient$(): Promise<ContainerClient> {
    const token = await this.getContainerToken$()
    return new BlobServiceClient(
      `https://${this._accountName}.blob.core.windows.net?${token}`,
    ).getContainerClient(this._containerName)
  }

  /* private getContainerToken$(): Promise<string> {
    return this.http
      .get(`${environment.apiUrl}/blob/public-images/token`, {
        responseType: 'text',
      })
      .pipe(take(1))
      .toPromise()
  } */


  private getContainerToken$(): Promise<any> {
    return this.http
      .get(`${environment.apiUrl}/blob/public-images/token`, {
        responseType: 'text',
      })
      .pipe(
        first(), // Take the first emission and complete
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      )
      .toPromise()
      .then((url: string) => ({
        success: true,
        error: "",
        url: url
      }));
  }

}
