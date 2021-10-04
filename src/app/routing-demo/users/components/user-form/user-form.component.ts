import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  UrlTree,
  ParamMap,
  Params,
} from '@angular/router';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { pluck, switchMap, tap } from 'rxjs/operators';

import { UserModel } from './../../models/user.model';
import { UserArrayService } from './../../services/user-array.service';

import { CanComponentDeactivate, DialogService } from './../../../core';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent
  implements OnInit, CanComponentDeactivate, OnDestroy
{
  user: UserModel;
  originalUser: UserModel;
  private userSub: Subscription;

  constructor(
    private userArrayService: UserArrayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {}

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const flags = Object.keys(this.originalUser).map((key) => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every((el) => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  ngOnInit(): void {
    // this.getUserFromResolveGuard();
    // this.getUserFromPathVariables();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onSaveUser() {
    const user = { ...this.user };

    if (user.id) {
      this.userArrayService.updateUser(user);
      this.router.navigate(['/users', { editedUserID: user.id }]);
    } else {
      this.userArrayService.createUser(user);
      this.onGoBack();
    }
    this.originalUser = { ...this.user };
  }

  onGoBack() {
    // activated route: users/edit/userID
    this.router.navigate(['./../../'], { relativeTo: this.activatedRoute });
  }

  private getUserFromResolveGuard() {
    this.userSub = this.activatedRoute.data
      .pipe(pluck('user'))
      .subscribe((user: UserModel) => {
        this.user = { ...user };
        this.originalUser = { ...user };
      });
  }

  private getUserFromPathVariables() {
    this.activatedRoute.paramMap
      .pipe(
        pluck('params', 'userID'),
        switchMap((id: number) => this.userArrayService.getUser(id))
      )
      .subscribe((user) => (this.user = user));
  }
}
