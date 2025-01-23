import { CanActivateFn, Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private shareService: ShareService) {}

  canActivate(): boolean {
    console.log(this.shareService.getLogeado());
    if (sessionStorage.getItem("login")=="true") {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
};