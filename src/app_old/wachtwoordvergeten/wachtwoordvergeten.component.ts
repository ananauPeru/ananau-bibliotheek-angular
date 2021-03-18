import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateCompiler, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wachtwoordvergeten',
  templateUrl: './wachtwoordvergeten.component.html',
  styleUrls: ['./wachtwoordvergeten.component.scss']
})
export class WachtwoordvergetenComponent implements OnInit {

  public wachtwoordVergetenFormulier: FormGroup;

  constructor(private fb: FormBuilder, public translate: TranslateService) { }

  ngOnInit() {
    this.wachtwoordVergetenFormulier = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  verzendEmail() {
    alert(this.wachtwoordVergetenFormulier.value.email + '' + this.wachtwoordVergetenFormulier.value.wachtwoord);
  }

  getErrorMessage(errors: any): string {
    if (errors == null) {
      return;

    } else if (errors.required) {
      return this.translate.instant('xIsVelplicht', { naam: "email" });
    }

    else if (errors.email) {
      return this.translate.instant('ongeldigEmailadres');
    }
  }

}
