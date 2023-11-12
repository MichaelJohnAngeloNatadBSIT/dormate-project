import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDormComponent } from './components/add-dorm/add-dorm.component';
import { DormDetailsComponent } from './components/dorm-details/dorm-details.component';
import { DormsListComponent } from './components/dorms-list/dorms-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login-registration/login/login.component';
import { RegisterComponent } from './login-registration/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardLandlordComponent } from './components/board-landlord/board-landlord.component';
import { BoardUserComponent } from './components/board-user/board-user.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorComponent } from './error/error-component/error-component.component';
import { ErrorInterceptor } from './error/error-interceptor.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './helpers/loading.interceptor';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { UserImageDialogComponent } from './components/user-image-dialog/user-image-dialog.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { CertificateUploadDialogComponent } from './components/certificate-upload-dialog/certificate-upload-dialog.component';
import { DormImagesUploadDialogComponent } from './components/dorm-images-upload-dialog/dorm-images-upload-dialog.component';
import { EditDormInfoDialogComponent } from './components/edit-dorm-info-dialog/edit-dorm-info-dialog.component';
import { DeleteDormDialogComponent } from './components/delete-dorm-dialog/delete-dorm-dialog.component';
import { EventDialogComponent } from './event/event-dialog/event-dialog.component';
import { EventInterceptor} from './event/event-interceptor.interceptor';
import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    AppComponent,
    AddDormComponent,
    DormDetailsComponent,
    DormsListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardLandlordComponent,
    BoardUserComponent,
    ErrorComponent,
    SpinnerComponent,
    EditDialogComponent,
    UserImageDialogComponent,
    CertificateUploadDialogComponent,
    DormImagesUploadDialogComponent,
    EditDormInfoDialogComponent,
    DeleteDormDialogComponent,
    EventDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxUsefulSwiperModule,
    MatTableModule,

  ],
  providers: [
              authInterceptorProviders, 
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: EventInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
            ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, EventDialogComponent]
})
export class AppModule { }
