import { Component, OnInit, ViewChild } from "@angular/core";
import { NgxScannerQrcodeComponent } from "ngx-scanner-qrcode";
import { CheckInService } from "../_services/check-in/check-in.service";
import { ToastrService } from "ngx-toastr";
import { ChangeDetectorRef } from "@angular/core";
import { QRCodeData } from "../_models/qr-code-data";

@Component({
  selector: "app-check-in",
  templateUrl: "./check-in.component.html",
  styleUrls: ["./check-in.component.scss"],
})
export class CheckInComponent implements OnInit {
  @ViewChild("scanner") scanner: NgxScannerQrcodeComponent;

  isLoading: boolean = false;

  qrCodeResult: string;
  qrCodeReusltJson: QRCodeData;
  checkIn: boolean | null;

  searchResult: string;

  checkInUserId: number;
  searchUserId: number;
  searchStartDate: Date | null;
  searchEndDate: Date | null;

  constructor(
    private checkInService: CheckInService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.scanner.start();
  }

  onCodeResult(resultString: any) {
    //Stop the scanner
    this.scanner.stop();

    //Sets loading to true
    this.isLoading = true;

    //Get the result from the scanner
    const result = resultString[0].value;

    //Set the result to the qrCodeResult
    this.qrCodeResult = result;

    //Parse the result to a JSON object
    this.qrCodeReusltJson = JSON.parse(result);

    //Checks in/out the user based on the qr code result
    this.onSubmitCheckin(this.qrCodeReusltJson.id);

    //Reset the scanner after 5 seconds
    setTimeout(() => this.resetScanner(), 5000);
  }

  resetScanner() {
    this.qrCodeResult = null;
    this.qrCodeReusltJson = null;
    this.checkIn = null;
    this.cdr.detectChanges();
    if (this.scanner) this.scanner.start();
  }

  onSearch() {
    this.checkInService
      .getCheckinHistory(
        this.searchUserId,
        this.searchStartDate,
        this.searchEndDate
      )
      .subscribe((result: CheckInHistory[]) => {
        let totalCheckInTime = 0;

        result.forEach((entry) => {
          const checkInTime = new Date(entry.checkInTime).getTime();
          const checkOutTime = entry.checkOutTime
            ? new Date(entry.checkOutTime).getTime()
            : Date.now();

          const duration = checkOutTime - checkInTime;
          totalCheckInTime += duration;
        });

        const totalHours = Math.floor(totalCheckInTime / 3600000);
        const totalMinutes = Math.floor((totalCheckInTime % 3600000) / 60000);
        const totalSeconds = Math.floor((totalCheckInTime % 60000) / 1000);

        this.searchResult = `Total Check-In Time: ${totalHours} hours, ${totalMinutes} minutes, ${totalSeconds} seconds`;
        this.cdr.detectChanges();
      });
  }

  /**
   * Convert a date object to local time.
   * @param date The date object to convert to local time.
   * @returns Local time in the format of HH:MM:SS
   */
  getLocalTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * Checks in/out a user based on the user id.
   * @param userId The id of the user.
   */
  private onSubmitCheckin(userId: number) {
    userId = parseInt(userId.toString());
    this.checkInService.isCheckedIn(userId).subscribe((result) => {
      if (result === true) {
        this.checkInService
          .checkOut(userId)
          .subscribe((res: CheckInHistory) => {
            this.isLoading = false;
            this.toastr.success(
              `Checked out successfully at ${this.getLocalTime(
                new Date(res.checkOutTime)
              )}`
            );
            this.cdr.detectChanges();
          });
      } else {
        this.checkInService.checkIn(userId).subscribe((res: CheckInHistory) => {
          this.isLoading = false;
          this.toastr.success(
            `Checked in successfully at ${this.getLocalTime(
              new Date(res.checkInTime)
            )}`
          );
          this.cdr.detectChanges();
        });
      }
    });
  }
}
