import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { UserModel } from '../models/user.model';
import { UserArrayService } from './../services';
import { UsersServicesModule } from '../users-services.module';
import { map, take, catchError, delay, finalize } from 'rxjs/operators';
import { SpinnerService } from './../../widgets';

@Injectable({
  providedIn: UsersServicesModule,
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private userArrayService: UserArrayService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UserModel | Observable<UserModel> | Promise<UserModel> {
    if (!route.paramMap.has('userID')) {
      return of(new UserModel(null, '', ''));
    }

    this.spinner.show();
    const id = +route.paramMap.get('userID');

    return this.userArrayService.getUser(id).pipe(
      map((user: UserModel) => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/users']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
