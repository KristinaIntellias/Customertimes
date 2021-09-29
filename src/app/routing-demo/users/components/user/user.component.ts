import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user: UserModel;
  @Output() onUserEdit = new EventEmitter<UserModel>();

  onEditUser() {
    this.onUserEdit.emit(this.user);
  }
}
