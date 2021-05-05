import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { AuthService, UserModel } from "../../auth";
import { UserService } from "../data-services/user.service";
import { UserDTO } from "../_dto/user-dto";

@Component({
  selector: "app-personal-information",
  templateUrl: "./personal-information.component.html",
  styleUrls: ["./personal-information.component.scss"],
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  avatarPic = "none";
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private userService: UserService,
    private toasts: ToastrService
  ) {
    this.isLoading$ = this.authService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const sb = this.authService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user))
      .subscribe((user) => {
        this.user = Object.assign({}, user);
        this.firstUserState = Object.assign({}, user);
        this.loadForm();
      });
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      pic: [this.user.pic],
      firstname: [
        this.user.userDetail.firstName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      lastname: [
        this.user.userDetail.lastName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      email: [
        this.user.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      phone: [
        this.user.userDetail.phone,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[+?][0-9 ]*$"),
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      dateofbirth: [
        this.user.userDetail.dateOfBirth
          ? this.datePipe.transform(
              this.user.userDetail.dateOfBirth,
              "yyyy-MM-dd"
            )
          : "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    let dto = new UserDTO();
    dto.userId = this.user.userDetail.applicationUserId;
    dto.firstName = this.formGroup.get("firstname").value;
    dto.lastName = this.formGroup.get("lastname").value;
    dto.dateOfBirth = this.formGroup.get("dateofbirth").value;
    dto.phone = this.formGroup.get("phone").value;

    // Do request to your server for user update, we just imitate user update there
    this.authService.isLoadingSubject.next(true);
    this.userService.updateUser$(dto).subscribe(
      (user) => {
        this.authService.currentUserSubject.next(Object.assign({}, user));
        this.authService.isLoadingSubject.next(false);
        this.toasts.success("User successfully updated", "Success");
      },
      () => {
        this.toasts.error("Something went wrong.", "Error");
      }
    );
  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
  }

  getPic() {
    if (!this.user.pic) {
      return "none";
    }

    return `url('${this.user.pic}')`;
  }

  deletePic() {
    this.user.pic = "";
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
