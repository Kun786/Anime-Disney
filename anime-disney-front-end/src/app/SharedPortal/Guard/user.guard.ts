import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from '../Services/main.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private mainService: MainService, private router: Router) {}
  canActivate() {
    if (!this.mainService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
