import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrUtil } from "src/app/_utils/toastr_util";
import { BlobNamePrefix } from "../_models/blob-name-prefix";
import { RegistrationRole } from "../_models/registration-role";
import { RegistrationModel } from "../_models/registration.model";
import { RegistrationService } from "../_services/registration/registration.service";
import { UserStorageService } from "../_services/registration/user-storage.service";

@Component({
  selector: "app-registration-details",
  templateUrl: "./registration-details.component.html",
  styleUrls: ["./registration-details.component.scss"],
})
export class RegistrationDetailsComponent implements OnInit {
  private _registration: BehaviorSubject<RegistrationModel> = new BehaviorSubject(
    null
  );
  private _userId: number;
  public role: RegistrationRole;
  public registration$: Observable<RegistrationModel> = this._registration.asObservable();
  public errorMessage: string;
  public confirming: boolean;
  public deleting: boolean;
  public internationalPassportFiles = new Array<File>();
  public goodConductCertificateFiles = new Array<File>();
  public diplomaFiles = new Array<File>();
  public passportPhotoFiles = new Array<File>();

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private toastr: ToastrUtil,
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router,
    private userStorageService: UserStorageService
  ) {
    this.route.data.subscribe(
      (data) =>
        (this.role = data["role"] ? data["role"] : RegistrationRole.VOLUNTEER)
    );
    this.route.params.subscribe((params) => (this._userId = params["id"]));

    if (this.role === RegistrationRole.STUDENT) {
      this.registrationService
        .getStudentRegistrationById$(this._userId)
        .subscribe(
          (registration) => this._registration.next(registration),
          (err) => {
            console.error(err);
            this.errorMessage = err;
          }
        );
    } else {
      this.registrationService
        .getVolunteerRegistrationById$(this._userId)
        .subscribe(
          (registration) => this._registration.next(registration),
          (err) => {
            console.error(err);
            this.errorMessage = err;
          }
        );
    }
  }

  ngOnInit(): void {
    this.userStorageService.getNewFile$.subscribe((file) => {
      if (file.name.startsWith(BlobNamePrefix.InternationalPassport)) {
        this.internationalPassportFiles.push(file);
      }
      if (file.name.startsWith(BlobNamePrefix.GoodConductCertificate)) {
        this.goodConductCertificateFiles.push(file);
      }
      if (file.name.startsWith(BlobNamePrefix.Diploma)) {
        this.diplomaFiles.push(file);
      }
      if (file.name.startsWith(BlobNamePrefix.PassportPhoto)) {
        this.passportPhotoFiles.push(file);
      }
      this.cdRef.detectChanges();
    });

    this.userStorageService.fetchFiles$(this._userId);
  }

  confirm(confirm: boolean) {
    this.confirming = true;
    this.registrationService
      .confirmRegistration$(this._userId, confirm)
      .subscribe(
        () => {
          let updatedRegistration = this._registration.value;
          updatedRegistration.confirmed = confirm;
          this._registration.next(updatedRegistration);
          this.toastr.showSuccess(
            this.translate.instant(
              confirm
                ? "REGISTRATIONS.TOASTS.CONFIRM_SUCCESS"
                : "REGISTRATIONS.TOASTS.DISCONFIRM_SUCCESS"
            ),
            this.translate.instant("REGISTRATIONS.TOASTS.SUCCESS")
          );
        },
        (err) => {
          console.error(err);
          this.toastr.showError(
            this.translate.instant(
              confirm
                ? "REGISTRATIONS.TOASTS.CONFIRM_ERROR"
                : "REGISTRATIONS.TOASTS.DISCONFIRM_ERROR"
            ),
            this.translate.instant("REGISTRATIONS.TOASTS.ERROR")
          );
        },
        () => {
          this.confirming = false;
          this.cdRef.detectChanges();
        }
      );
  }

  delete() {
    this.deleting = true;
    this.registrationService.deleteRegistration$(this._userId).subscribe(
      () => {
        this.toastr.showSuccess(
          this.translate.instant("REGISTRATIONS.TOASTS.DELETE_SUCCESS"),
          this.translate.instant("REGISTRATIONS.TOASTS.SUCCESS")
        );
        this.router.navigate(["/organization/registrations"]);
      },
      (err) => {
        console.error(err);
        this.toastr.showError(
          this.translate.instant("REGISTRATIONS.TOASTS.DELETE_ERROR"),
          this.translate.instant("REGISTRATIONS.TOASTS.ERROR")
        );
      },
      () => {
        this.confirming = false;
        this.cdRef.detectChanges();
      }
    );
  }

  downloadFile(file: File) {
    console.log(file);
    const url = window.URL.createObjectURL(file);
    window.open(url);
  }
}
