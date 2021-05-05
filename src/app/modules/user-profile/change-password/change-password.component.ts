import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { AuthService, UserModel, ConfirmPasswordValidator } from "../../auth";
import { UserService } from "../data-services/user.service";
import { ChangePasswordDTO } from "../_dto/change-password-dto";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
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
    this.formGroup = this.fb.group(
      {
        currentPassword: [this.user.password, Validators.required],
        password: ["", Validators.required],
        cPassword: ["", Validators.required],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    let dto = new ChangePasswordDTO();
    dto.oldPassword = this.formGroup.value.currentPassword;
    dto.newPassword = this.formGroup.value.password;
    dto.newPasswordConfirmation = this.formGroup.value.cPassword;

    this.userService.changePassword$(dto).subscribe(
      () => {
        this.toasts.success("Password successfully updated.", "Success");
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

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
