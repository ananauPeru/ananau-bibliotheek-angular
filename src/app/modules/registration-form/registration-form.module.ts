import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { ContainerComponent } from "./container/container.component";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PersonalInformationComponent } from "./personal-information/personal-information.component";
import { ReactiveFormsModule } from "@angular/forms";
import { OrganizationalInformationComponent } from "./organizational-information/organizational-information.component";
import { ScanUploadsComponent } from "./scan-uploads/scan-uploads.component";
import { QuestionsComponent } from "./questions/questions.component";
import { MarkAsteriskDirective } from "./directives/mark-asterisk.directive";
import { TranslationModule } from "../i18n/translation.module";
import { LayoutModule } from "src/app/pages/layout.module";
import { RegistrationFormRoutingModule } from "./registration-form-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { RegistrationFormComponent } from "./registration-form.component";

@NgModule({
  declarations: [
    RegistrationFormComponent,
    ContainerComponent,
    PersonalInformationComponent,
    OrganizationalInformationComponent,
    ScanUploadsComponent,
    QuestionsComponent,
    MarkAsteriskDirective,
  ],
  imports: [
    RegistrationFormRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    TranslationModule,
    LayoutModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  exports: [ContainerComponent],
})
export class RegistrationFormModule {}
