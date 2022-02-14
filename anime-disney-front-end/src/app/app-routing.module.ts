import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundsComponent } from './adminPortal/components/backgrounds/backgrounds.component';
import { DashboardComponent } from './adminPortal/components/dashboard/dashboard.component';
import { GifsComponent } from './adminPortal/components/gifs/gifs.component';
import { MusicComponent } from './adminPortal/components/music/music.component';
import { UsersComponent } from './adminPortal/components/users/users.component';
import { VideosComponent } from './adminPortal/components/videos/videos.component';
import { DefaultComponent } from './adminPortal/default/default.component';
import { AboutComponent } from './MainPortal/about/about.component';
import { HomeComponent } from './MainPortal/home/home.component';
import { UserLoginComponent } from './ManagementPortal/UserManagement/user-login/user-login.component';
import { UserRegisterComponent } from './ManagementPortal/UserManagement/user-register/user-register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:UserLoginComponent},
  {path:'register',component:UserRegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'adminPortal', component: DefaultComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'all-videos', component: VideosComponent},
    {path: 'all-gifs', component: GifsComponent},
    {path: 'all-music', component: MusicComponent},
    {path: 'all-users', component: UsersComponent},
    {path: 'all-backgrounds', component: BackgroundsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
