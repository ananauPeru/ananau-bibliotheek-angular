import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";
import {
  NgbDropdownModule,
  NgbModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { CRUDTableModule } from "../../_metronic/shared/crud-table";
import { WidgetsModule } from "../../_metronic/partials/content/widgets/widgets.module";
import { DropdownMenusModule } from "../../_metronic/partials/content/dropdown-menus/dropdown-menus.module";
import { UserProfileComponent } from "./user-profile.component";
import { PersonalInformationComponent } from "./personal-information/personal-information.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { TranslationModule } from "../i18n/translation.module";

@NgModule({
  declarations: [
    UserProfileComponent,
    PersonalInformationComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CRUDTableModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    UserProfileRoutingModule,
    DropdownMenusModule,
    NgbDropdownModule,
    NgbTooltipModule,
    WidgetsModule,
    NgbModule,
    TranslationModule,
  ],
  providers: [DatePipe],
})
export class UserProfileModule {}
