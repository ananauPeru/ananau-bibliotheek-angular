import { Component, OnInit, ViewChild } from "@angular/core";
import { NgxScannerQrcodeComponent } from "ngx-scanner-qrcode";
import { CheckInService } from "../_services/check-in/check-in.service";
import { ToastrService } from "ngx-toastr";
import { ChangeDetectorRef } from "@angular/core";
import { QRCodeData } from "../_models/qr-code-data";
import { Subscription } from "rxjs";
import { OverlayService } from "../../overlay/_service/overlay.service";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";

@Component({
  selector: "app-check-in",
  templateUrl: "./check-in.component.html",
  styleUrls: ["./check-in.component.scss"],
})
export class CheckInComponent implements OnInit {
  @ViewChild("scanner", { static: false })
  scanner: ZXingScannerComponent;

  scannerEnabled: boolean = false;

  isLoading: boolean = false;

  qrCodeResult: string;
  qrCodeReusltJson: QRCodeData;
  checkIn: boolean | null;

  searchResult: string;

  checkInUserId: number;
  searchUserId: number;
  searchStartDate: Date | null;
  searchEndDate: Date | null;

  private subscriptions: Subscription[] = [];

  constructor(
    private checkInService: CheckInService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // this.scanner.start();
    this.scannerEnabled = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    // this.scanner.stop();
    this.scannerEnabled = false;
  }

  onCodeResult(resultString: any) {
    if (resultString === null || resultString === undefined) {
      console.error("Invalid QR Code", "Undefined");
      return;
    }

    try {
      resultString = JSON.parse(resultString);
    } catch (error) {
      this.toastr.error("Invalid QR Code");
      console.error(error);
      return;
    }
    if (
      !resultString.id ||
      !resultString.firstName ||
      !resultString.lastName ||
      !resultString.dateOfBirth
    ) {
      console.error("Invalid QR Code");
      this.toastr.error("Invalid QR Code");
      return;
    }

    //Sets loading to true
    this.isLoading = true;

    //Set the result to the qrCodeResult
    this.qrCodeResult = resultString;

    //Parse the result to a JSON object
    this.qrCodeReusltJson = resultString;

    //Checks in/out the user based on the qr code result
    this.onSubmitCheckin(this.qrCodeReusltJson.id);

    //Reset the scanner after 5 seconds
    setTimeout(() => this.resetScanner(), 4000);
  }

  resetScanner() {
    this.qrCodeResult = null;
    this.qrCodeReusltJson = null;
    this.checkIn = null;
    this.cdr.detectChanges();
  }

  onSearch() {
    const subscription = this.checkInService
      .getCheckInHistory(
        this.searchUserId,
        this.searchStartDate,
        this.searchEndDate
      )
      .subscribe((result: CheckInHistory[]) => {
        let totalCheckInTime = 0;

        result.forEach((entry) => {
          const checkInTime = new Date(entry.checkIn).getTime();
          const checkOutTime = entry.checkOut
            ? new Date(entry.checkOut).getTime()
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

    this.subscriptions.push(subscription);
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

    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${hours}:${minutesString}:${secondsString}`;
  }

  /**
   * Checks in/out a user based on the user id.
   * @param userId The id of the user.
   */
  private onSubmitCheckin(userId: number) {
    userId = parseInt(userId.toString());
    const subscription = this.checkInService
      .checkIn(userId)
      .subscribe((response: CheckInHistory) => {
        if (response.checkOut === null) {
          this.showSuccessMessage(`
          <h3>Welcome ${this.qrCodeReusltJson.firstName}</h3>
          <h3>Checked in successfully at <strong>
            ${this.getLocalTime(new Date(response.checkIn))}</strong></h3>
          `);
        } else {
          this.showSuccessMessage(`
          <h3>Goodbye ${this.qrCodeReusltJson.firstName}</h3>
          <h3>Checked out successfully at <strong>${this.getLocalTime(
            new Date(response.checkOut)
          )}</strong></h3>
          `);
        }
      });

    this.subscriptions.push(subscription);
  }

  private showSuccessMessage(message: string) {
    this.overlayService.open(message, 4000);
  }

  private showBirthdayMessage(time: string) {
    this.overlayService.open(
      `
    <h3>Happy Birthday ${this.qrCodeReusltJson.firstName}!</h3>
    <h3>Enjoy your day!</h3>
    <h3>Checked in successfully at <strong>${time}</strong></h3>
    `,
      4000
    );
  }
}
