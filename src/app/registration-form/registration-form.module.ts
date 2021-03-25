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
import { FormRole } from "./models/form-role";
import { MarkAsteriskDirective } from "./directives/mark-asterisk.directive";

const routes: Routes = [
  {
    path: "student",
    component: ContainerComponent,
    data: {
      role: FormRole.STUDENT,
    },
  },
  {
    path: "volunteer",
    component: ContainerComponent,
    data: {
      role: FormRole.VOLUNTEER,
    },
  },
  {
    path: "",
    component: ContainerComponent,
    data: {
      role: FormRole.VOLUNTEER,
    },
  },
];

@NgModule({
  declarations: [
    ContainerComponent,
    PersonalInformationComponent,
    OrganizationalInformationComponent,
    ScanUploadsComponent,
    QuestionsComponent,
    MarkAsteriskDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  providers: [DatePipe],
  exports: [ContainerComponent],
})
export class RegistrationFormModule {}
