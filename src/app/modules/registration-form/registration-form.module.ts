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
import { NgxDropzoneModule } from "ngx-dropzone";
import { GeneralInformationComponent } from "./general-information/general-information.component";

@NgModule({
  declarations: [
    RegistrationFormComponent,
    ContainerComponent,
    PersonalInformationComponent,
    OrganizationalInformationComponent,
    ScanUploadsComponent,
    QuestionsComponent,
    GeneralInformationComponent,
    MarkAsteriskDirective,
  ],
  imports: [
    RegistrationFormRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    TranslationModule,
    LayoutModule,
    HttpClientModule,
    NgxDropzoneModule,
  ],
  providers: [DatePipe],
  exports: [ContainerComponent],
})
export class RegistrationFormModule {}
