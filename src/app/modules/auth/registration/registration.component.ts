import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { AuthService } from "../_services/auth.service";
import { Router } from "@angular/router";
import { ConfirmPasswordValidator } from "./confirm-password.validator";
import { UserModel } from "../_models/user.model";
import { first } from "rxjs/operators";
import { RegisterDTO } from "../_dto/register-dto";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        role: ["", Validators.required],
        firstname: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        lastname: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        email: [
          "",
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        phone: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern("^[+?][0-9 ]*$"),
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        dateofbirth: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
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
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  submit() {
    this.hasError = false;

    const formValues = this.registrationForm.value;

    const newUser = new RegisterDTO();
    newUser.role = formValues.role;
    newUser.firstName = formValues.firstname;
    newUser.lastName = formValues.lastname;
    newUser.email = formValues.email;
    newUser.phone = formValues.phone;
    newUser.dateOfBirth = new Date(
      Date.UTC(
        formValues.dateofbirth.year,
        formValues.dateofbirth.month - 1,
        formValues.dateofbirth.day
      )
    );
    newUser.password = formValues.password;
    newUser.passwordConfirmation = formValues.cPassword;
    const registrationSubscr = this.authService
      .registration(newUser)
      .pipe(first())
      .subscribe((user: UserModel) => {
        if (user) {
          this.router.navigate(["/"]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
