import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './MainPortal/header/header.component';
import { FooterComponent } from './MainPortal/footer/footer.component';
import { HomeComponent } from './MainPortal/home/home.component';
import { UserLoginComponent } from './ManagementPortal/UserManagement/user-login/user-login.component';
import { UserRegisterComponent } from './ManagementPortal/UserManagement/user-register/user-register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
