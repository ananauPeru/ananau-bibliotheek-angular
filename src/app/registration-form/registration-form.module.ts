import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContainerComponent } from "./container/container.component";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
  {
    path: "",
    component: ContainerComponent,
  },
];

@NgModule({
  declarations: [ContainerComponent],
  imports: [CommonModule, TranslateModule, RouterModule.forChild(routes)],
  exports: [ContainerComponent],
})
export class RegistrationFormModule {}
