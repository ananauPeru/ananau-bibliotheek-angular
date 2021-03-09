import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContainerComponent } from "./container/container.component";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PersonalInformationComponent } from "./personal-information/personal-information.component";
import { ReactiveFormsModule } from "@angular/forms";
import { OrganizationalInformationComponent } from "./organizational-information/organizational-information.component";
import { ScanUploadsComponent } from "./scan-uploads/scan-uploads.component";
import { QuestionsComponent } from "./questions/questions.component";
import { FormTarget } from "./models/form-target";

const routes: Routes = [
  {
    path: "student",
    component: ContainerComponent,
    data: {
      target: FormTarget.STUDENT,
    },
  },
  {
    path: "volunteer",
    component: ContainerComponent,
    data: {
      target: FormTarget.VOLUNTEER,
    },
  },
  {
    path: "",
    component: ContainerComponent,
    data: {
      target: FormTarget.VOLUNTEER,
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
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  exports: [ContainerComponent],
})
export class RegistrationFormModule {}
