import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DormsListComponent } from './components/dorms-list/dorms-list.component';
import { DormDetailsComponent } from './components/dorm-details/dorm-details.component';
import { AddDormComponent } from './components/add-dorm/add-dorm.component';
import { RegisterComponent } from './components/login-registration/register/register.component';
import { LoginComponent } from './components/login-registration/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardLandlordComponent } from './components/board-landlord/board-landlord.component';


const routes: Routes = [
  { path: '', redirectTo: 'dorms', pathMatch: 'full'},
  { path: 'dorms', component: DormsListComponent },
  { path: 'dorms/:id', component: DormDetailsComponent },
  { path: 'add', component: AddDormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'landlord', component: BoardLandlordComponent },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
