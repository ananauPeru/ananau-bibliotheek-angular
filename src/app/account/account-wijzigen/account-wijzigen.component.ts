import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../data-services/account.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Gebruiker } from "../models/gebruiker.model";
import { TranslateService } from "@ngx-translate/core";
import { UserDTO } from "../_dto/UserDTO";

@Component({
  selector: "app-account-wijzigen",
  templateUrl: "./account-wijzigen.component.html",
  styleUrls: ["./account-wijzigen.component.scss"],
})
export class AccountWijzigenComponent implements OnInit {
  public accountWijzigenFormulier: FormGroup;
  public errorMessage: string = null;
  public loading: Boolean;
  public gebruiker: Gebruiker;
  public successMessage: string = null;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private accountService: AccountService,
    public translate: TranslateService
  ) {
    this.accountService.huidigeGebruiker.subscribe((value) => {
      this.gebruiker = value;
    });
  }

  ngOnInit() {
    console.log(this.gebruiker);

    this.accountWijzigenFormulier = this.fb.group({
      voornaam: [this.gebruiker.voornaam, [Validators.required]],
      achternaam: [this.gebruiker.achternaam, [Validators.required]],
      telefoon: [this.gebruiker.telefoonNummer, [Validators.required]],
      email: [
        this.gebruiker.email,
        [Validators.required, Validators.email],
        this.serverSideValidateUsername(
          this.accountService.checkUserNameAvailability
        ),
      ],
      geboorteDatum: [
        this.gebruiker.geboorteDatum.toISOString().substring(0, 10),
        [Validators.required],
      ],
      country: [this.gebruiker.country, [Validators.required]],
      nationality: [this.gebruiker.nationality, [Validators.required]],
    });
  }

  accountWijzigen() {
    this.successMessage = null;
    this.errorMessage = null;
    var email = this.gebruiker.email;

    let userDto: UserDTO = {
      userId: Number(this.gebruiker.id),
      email: email,
      firstName: this.accountWijzigenFormulier.value.voornaam,
      lastName: this.accountWijzigenFormulier.value.achternaam,
      phone: this.accountWijzigenFormulier.value.telefoon,
      dateOfBirth: this.accountWijzigenFormulier.value.geboorteDatum,
      country: this.accountWijzigenFormulier.value.country,
      nationality: this.accountWijzigenFormulier.value.nationality,
    };

    this.accountService.updateGebruiker(userDto).subscribe(
      (val) => {
        this.loading = true;
        if (val) {
          this.translate
            .get("wijzigingenToegepast")
            .subscribe((text: string) => {
              this.successMessage = text;
            });
          if (this.accountWijzigenFormulier.value.email != email) {
            this.accountService.logout();
          }
        }
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.translate.get("erLiepIetsFout").subscribe((text: string) => {
          this.errorMessage = text;
        });
      }
    );
  }

  serverSideValidateUsername(
    checkAvailabilityFn: (n: string) => Observable<boolean>
  ): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return checkAvailabilityFn(control.value).pipe(
        map((available) => {
          if (control.value == this.gebruiker.email) {
            return null;
          }
          if (available) {
            return null;
          }
          return { userAlreadyExists: true };
        })
      );
    };
  }
}
