import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './MainPortal/header/header.component';
import { FooterComponent } from './MainPortal/footer/footer.component';
import { HomeComponent } from './MainPortal/home/home.component';
import { UserLoginComponent } from './ManagementPortal/UserManagement/user-login/user-login.component';
import { UserRegisterComponent } from './ManagementPortal/UserManagement/user-register/user-register.component';
import { AboutComponent } from './MainPortal/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultModule } from './adminPortal/default/default.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
