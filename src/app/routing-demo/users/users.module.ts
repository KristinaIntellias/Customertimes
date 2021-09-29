import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersServicesModule } from './users-services.module';
import { UserComponent } from './components';


@NgModule({
  declarations: [
    UserComponent,
    ...UsersRoutingModule.components
  ],
  imports: [
    CommonModule,
    UsersServicesModule,
    FormsModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
