import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PathNotFoundComponent,
  AboutComponent,
  NavigationMenuComponent,
  MessagesComponent,
  LoginComponent,
} from './components';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

const exportedComponents = [
  AboutComponent,
  PathNotFoundComponent,
  NavigationMenuComponent,
  MessagesComponent,
  LoginComponent,
];

const materialModules = [MatMenuModule, MatIconModule, MatTabsModule];

@NgModule({
  declarations: [...exportedComponents],
  imports: [CommonModule, ...materialModules, FormsModule, RouterModule],
  exports: [
    FormsModule,
    RouterModule,
    ...exportedComponents,
    ...materialModules,
  ],
})
export class SharedModule {}
