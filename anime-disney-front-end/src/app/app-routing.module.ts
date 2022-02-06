import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './MainPortal/about/about.component';
import { HomeComponent } from './MainPortal/home/home.component';
import { UserLoginComponent } from './ManagementPortal/UserManagement/user-login/user-login.component';
import { UserRegisterComponent } from './ManagementPortal/UserManagement/user-register/user-register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:UserLoginComponent},
  {path:'register',component:UserRegisterComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
