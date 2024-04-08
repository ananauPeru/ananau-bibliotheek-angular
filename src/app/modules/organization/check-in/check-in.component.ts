import { Component, OnInit, ViewChild } from "@angular/core";
import { NgxScannerQrcodeComponent } from "ngx-scanner-qrcode";
import { CheckInService } from "../_services/check-in/check-in.service";
import { ToastrService } from "ngx-toastr";
import { ChangeDetectorRef } from "@angular/core";
import { QRCodeData } from "../_models/qr-code-data";
import { Subscription } from "rxjs";
import { OverlayService } from "../../overlay/_service/overlay.service";

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

  private subscriptions: Subscription[] = [];

  constructor(
    private checkInService: CheckInService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.scanner.start();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.scanner.stop();
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
      .getCheckInHistory(
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

    return `${hours}:${minutes}`;
  }

  /**
   * Checks in/out a user based on the user id.
   * @param userId The id of the user.
   */
  private onSubmitCheckin(userId: number) {
    userId = parseInt(userId.toString());
    const checkSubscription = this.checkInService
      .isCheckedIn(userId)
      .subscribe((result) => {
        if (result === true) {
          const checkOutSubscription = this.checkInService
            .checkIn(userId)
            .subscribe((res: CheckInHistory) => {
              this.isLoading = false;

              this.showSuccessMessage(`
            <h3>Goodbye ${this.qrCodeReusltJson.firstName}</h3>
            <h3>Checked out successfully at <strong>${this.getLocalTime(
              new Date(res.checkOutTime)
            )}.</strong></h3>
            `);
              this.cdr.detectChanges();
            });

          this.subscriptions.push(checkOutSubscription);
        } else {
          const checkInSubscription = this.checkInService
            .checkIn(userId)
            .subscribe((res: CheckInHistory) => {
              this.isLoading = false;

              const dateOfBirth = new Date(this.qrCodeReusltJson.dateOfBirth);
              const today = new Date();

              if (
                dateOfBirth.getDate() === today.getDate() &&
                dateOfBirth.getMonth() === today.getMonth()
              ) {
                this.showBirthdayMessage(
                  this.getLocalTime(new Date(res.checkInTime))
                );
              } else {
                this.showSuccessMessage(`
          <h3>Welcome ${this.qrCodeReusltJson.firstName}</h3>
          <h3>Checked in successfully at <strong>${this.getLocalTime(
            new Date(res.checkInTime)
          )}</strong></h3>
          `);
              }

              this.cdr.detectChanges();
            });

          this.subscriptions.push(checkInSubscription);
        }
      });

    this.subscriptions.push(checkSubscription);
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
