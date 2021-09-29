import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Route,
  UrlSegment,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log("CanLoad GUARD");
    return this.checkLogin(`/${route}`) as boolean;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log("CanActivateChild Guard is called");
    const { url } = state;
    return this.checkLogin(url);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { url } = state;

    return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }

    this.authService.redirectUrl = url;
    const sessionID = 19234;
    const navigationExtras: NavigationExtras = {
      queryParams: { sessionID },
      fragment: "anchor",
    };

    this.router.navigate(["/login"], navigationExtras);
    return false;
  }
}
