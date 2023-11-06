import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DormsListComponent } from './components/dorms-list/dorms-list.component';
import { DormDetailsComponent } from './components/dorm-details/dorm-details.component';
import { AddDormComponent } from './components/add-dorm/add-dorm.component';
// import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './login/login.component';
// import { HomeComponent } from './home/home.component';
// import { ProfileComponent } from './profile/profile.component';
// import { BoardUserComponent } from './board-user/board-user.component';
// import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
// import { BoardAdminComponent } from './board-admin/board-admin.component';
import { RegisterComponent } from './login-registration/register/register.component';
import { LoginComponent } from './login-registration/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardLandlordComponent } from './components/board-landlord/board-landlord.component';
import { CertificateUploadDialogComponent } from './components/certificate-upload-dialog/certificate-upload-dialog.component';
// import { AdminApp } from 'projects/admin-app/src/app/app.module';

const routes: Routes = [
  { path: '', redirectTo: 'dorms', pathMatch: 'full'},
  { path: 'dorms', component: DormsListComponent },
  { path: 'dorms/:id', component: DormDetailsComponent },
  { path: 'add', component: AddDormComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'landlord', component: BoardLandlordComponent },
  // { path: 'admin', component: AdminApp },
  // { path: 'admin', component: BoardAdminComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    // AdminApp.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
