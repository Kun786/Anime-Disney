import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  _ShowHead = true;
  _ShowFoot = true;

  title = 'anime-disney-front-end';
  constructor(private _Router:Router){
    _Router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          // event.url == '/admin' || 
          // event.url == '/admin/CreateCard' || 
          // event.url == '/admin/CardAnalytics' || 
          // event.url == '/admin/dashboard'|| 
          // event.url == '/admin/CreateFeatureCard' || 
          // event.url == '/admin/UserManagement' ||
          // event.url =='/admin/Settings' || 
          // event.url =='/admin/FeatureCardAnalytics' || 
          // event.url == '/superAdmin' || 
          // event.url == '/superAdmin/dummy' ||
          // event.url == '/user' ||
          // event.url == '/user/userDashboard'
          event.url.startsWith("/login") ||
          event.url.startsWith("/register")
          ) { this._ShowHead = false; this._ShowFoot = false; } else {
            this._ShowHead = true;
            this._ShowFoot = true;
          }
      }
    });
  }
}
