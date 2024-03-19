import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent, ScannerQRCodeConfig } from 'ngx-scanner-qrcode';
import { CheckInService } from '../_services/check-in/check-in.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  @ViewChild('scanner') scanner: NgxScannerQrcodeComponent;

  qrCodeResult: string;

  searchResult: string = "";

  checkInUserId: number;
  searchUserId: number;
  searchStartDate: Date | null;
  searchEndDate: Date | null;

  constructor(private checkInService: CheckInService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onCodeResult(resultString: string) {
    this.qrCodeResult = resultString;
    this.scanner.stop();
    console.log('QR Code Result', this.qrCodeResult);
  }

  resetScanner() {
    this.qrCodeResult = null;
  }

  onSearch() {
    this.checkInService.getCheckoutHistory(this.searchUserId, this.searchStartDate, this.searchEndDate).subscribe(
      (result: CheckInHistory[]) => {  
        let totalCheckInTime = 0;
        
        result.forEach((entry) => {
          const checkInTime = new Date(entry.checkInTime).getTime();
          const checkOutTime = entry.checkOutTime ? new Date(entry.checkOutTime).getTime() : Date.now();
          
          const duration = checkOutTime - checkInTime;
          totalCheckInTime += duration;
        });
  
        const totalHours = Math.floor(totalCheckInTime / 3600000);
        const totalMinutes = Math.floor((totalCheckInTime % 3600000) / 60000);
        const totalSeconds = Math.floor((totalCheckInTime % 60000) / 1000);
  
        // this.searchResult = `Total Check-In Time: ${totalHours} hours, ${totalMinutes} minutes, ${totalSeconds} seconds`;
        console.log(`Total Check-In Time: ${totalHours} hours, ${totalMinutes} minutes, ${totalSeconds} seconds`);
      }
    );
  }

  onSubmitCheckin() {
    this.checkInService.isCheckedIn(this.checkInUserId).subscribe(
      (result) => {
        if(result === true) {
            this.checkInService.checkOut(this.checkInUserId).subscribe(
              (res : CheckInHistory) => {
                this.toastr.success(`Succesfully checked out at ${res.checkOutTime}.`);
                console.log(res);
              }
            )
        } else {
          this.checkInService.checkIn(this.checkInUserId).subscribe(
            (res : CheckInHistory) => {
              this.toastr.success(`Succesfully checked in at ${res.checkInTime}.`);
              console.log(res);
            }
          )
        }
      }
    )
  }

}
