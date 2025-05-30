import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { TranslationModule } from '../i18n/translation.module'
import { LayoutModule } from 'src/app/pages/layout.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSliderModule } from '@angular/material/slider'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatTreeModule } from '@angular/material/tree'
import { routes } from 'src/app/app-routing.module'
import { CoreModule } from 'src/app/_metronic/core'
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { ITDocumentationComponent } from './it-documentation'
import { ITDocumentationRoutingModule } from './it-documentation-routing.module'
import { S0PreparationsComponent } from './getting-started/s0-preparations/s0-preparations.component'
import { S1SettingUpComponent } from './getting-started/s1-setting-up/s1-setting-up.component'
import { PostsComponent } from './posts/posts.component'
import { QuillModule } from 'ngx-quill'
import { S2BestPracticesComponent } from './getting-started/s2-best-practices/s2-best-practices.component'
import { GithubComponent } from './getting-started/s2-best-practices/github/github.component'
import { ModelsAndTablesComponent } from './getting-started/s2-best-practices/models-and-tables/models-and-tables.component'
import { ToDosComponent } from './todos/todos.component';
import { OverviewComponent } from './todos/overview/overview.component';
import { CreateComponent } from './todos/create/create.component';
import { DeployComponent } from './getting-started/deploy/deploy.component';
import { EducationalAppComponent } from './educational-app/educational-app/educational-app.component'

@NgModule({
  declarations: [
    ITDocumentationComponent,
    S0PreparationsComponent,
    S1SettingUpComponent,
    PostsComponent,
    S2BestPracticesComponent,
    GithubComponent,
    ModelsAndTablesComponent,
    ToDosComponent,
    OverviewComponent,
    CreateComponent,
    DeployComponent,
    EducationalAppComponent,
  ],
  imports: [
    CommonModule,

    // material modules
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatGridListModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatDividerModule,
    MatSortModule,
    MatStepperModule,
    MatChipsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRippleModule,
    CoreModule,
    MatRadioModule,
    MatTreeModule,
    MatButtonToggleModule,
    GeneralModule,

    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslationModule,
    ITDocumentationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    NgbModule,
    NgxDropzoneModule,
    QuillModule.forRoot(),
  ],
  providers: [DatePipe],
})
export class ITDocumentationModule {}
