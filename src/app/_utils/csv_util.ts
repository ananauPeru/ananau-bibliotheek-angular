import { IndividualConfig, ToastrService } from 'ngx-toastr'
import { Injectable } from '@angular/core'
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class CsvUtil {
  constructor() {}

  csvDownload(globalData: any, fileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(globalData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Exported Data': worksheet }, SheetNames: ['Exported Data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    fileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
 }
}
