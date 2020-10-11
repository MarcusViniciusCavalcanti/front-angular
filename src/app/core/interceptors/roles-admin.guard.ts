import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../service/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class RolesAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userService.getProfile().toPromise().then(user => {
      if (user.roles.some(role => role.name === 'ROLE_ADMIN') && user.credentialsNonExpired === true && user.accountNonExpired === true) {
        return true;
      }

      this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
      return false;
    }).catch(error => {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    })
  }
}
