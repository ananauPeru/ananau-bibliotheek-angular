import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import { catchError, first, map, take } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Subject, throwError } from 'rxjs'
import { ScansFile } from '../../models/storage/scan-file.model'

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

  /**
   * Stores a file in the Azure Blob Storage
   * @param file The file to be stored
   * @param folder The folder where the file will be stored
   * @param prefix The prefix to be added to the file name
   * @returns The url of the stored file
   */
  public async storeFile$(
    file: File,
    folder = 'assets',
    prefix = 'uniqueprefix',
  ): Promise<string> {
    const containerClient = await this.getContainerClient$()
    var blob = containerClient.getBlockBlobClient(
      folder + '/' + prefix + '-' + file.name,
    )
    await blob.uploadData(file, {
      blobHTTPHeaders: { blobContentType: file.type },
    })
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


  private getContainerToken$(): Promise<string> {
    return this.http
      .get(`${environment.apiUrl}/blob/public-images/token`, {
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
