import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { BackgroundsComponent } from '../components/backgrounds/backgrounds.component';
import { GifsComponent } from '../components/gifs/gifs.component';
import { MusicComponent } from '../components/music/music.component';
import { UsersComponent } from '../components/users/users.component';
import { VideosComponent } from '../components/videos/videos.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DefaultComponent,
    VideosComponent,
    GifsComponent,
    MusicComponent,
    BackgroundsComponent,
    UsersComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    RouterModule
  ]
})
export class DefaultModule { }
