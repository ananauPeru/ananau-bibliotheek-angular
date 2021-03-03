import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContainerComponent } from "./container/container.component";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PersonalInformationComponent } from "./personal-information/personal-information.component";
import { ReactiveFormsModule } from "@angular/forms";
import { OrganizationalInformationComponent } from './organizational-information/organizational-information.component';

const routes: Routes = [
  {
    path: "",
    component: ContainerComponent,
  },
];

@NgModule({
  declarations: [ContainerComponent, PersonalInformationComponent, OrganizationalInformationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  exports: [ContainerComponent],
})
export class RegistrationFormModule {}
