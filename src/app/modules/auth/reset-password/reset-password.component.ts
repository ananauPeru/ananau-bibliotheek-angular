import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { ToastrUtil } from "src/app/_utils/toastr_util";
import { ConfirmPasswordValidator } from "../registration/confirm-password.validator";
import { ResetPasswordDTO } from "../_dto/reset-password-dto";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private _token: string;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrUtil
  ) {
    let urlToken = "";
    this.route.params.subscribe((params) => (urlToken = params["token"]));
    this._token = urlToken
      .replace(/\//g, "%2F")
      .replace(/\+/g, "%2B")
      .replace(/\=/g, "%3D");
    console.log(this._token);

    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetPasswordForm.controls;
  }

  initForm() {
    this.resetPasswordForm = this.fb.group(
      {
        email: [
          "",
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  submit() {
    this.hasError = false;

    const formValues = this.resetPasswordForm.value;

    const dto = new ResetPasswordDTO();
    dto.token = this._token;
    dto.email = formValues.email;
    dto.newPassword = formValues.password;
    dto.newPasswordConfirmation = formValues.cPassword;
    const registrationSubscr = this.authService
      .resetPassword(dto)
      .pipe(first())
      .subscribe(
        () => {
          this.toastr.showSuccess(
            "Password has been successfully reset.",
            "Success"
          );
          this.router.navigate(["/auth/login"]);
        },
        () => {
          this.toastr.showError(
            "Something went wrong. Please try again later.",
            "Error"
          );
        }
      );
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
