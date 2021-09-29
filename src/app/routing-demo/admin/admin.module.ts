import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [
    AdminRoutingModule.components,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
