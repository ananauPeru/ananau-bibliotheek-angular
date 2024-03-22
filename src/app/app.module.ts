import { NgModule, APP_INITIALIZER } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { ClipboardModule } from 'ngx-clipboard'
import { TranslateModule } from '@ngx-translate/core'
import { InlineSVGModule } from 'ng-inline-svg'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthService } from './modules/auth/_services/auth.service'
import { environment } from 'src/environments/environment'
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';


// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { SplashScreenModule } from "./_metronic/partials/layout/splash-screen/splash-screen.module";

import { httpInterceptorProviders } from "./http-interceptor";
import { OverlayComponent } from './modules/overlay/overlay.component'
import { OverlayService } from './modules/overlay/_service/overlay.service'

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

LOAD_WASM().subscribe();

@NgModule({
  declarations: [AppComponent, OverlayComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot(),
    ReactiveFormsModule,
    NgxScannerQrcodeModule,
    QRCodeModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import("highlight.js/lib/core"),
        languages: {
          xml: () => import("highlight.js/lib/languages/xml"),
          typescript: () => import("highlight.js/lib/languages/typescript"),
          scss: () => import("highlight.js/lib/languages/scss"),
          json: () => import("highlight.js/lib/languages/json"),
        },
      },
    },
    httpInterceptorProviders,
    OverlayService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
