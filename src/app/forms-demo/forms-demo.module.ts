import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { SignupFormComponent } from './template-driven-forms/signup-form/signup-form.component';
import { SignupReactiveFormComponent } from './reactive-forms/signup-reactive-form/signup-reactive-form.component';
import { ValidatorsModule } from './validators/validators.module';
import { AddressInfoComponent } from './reactive-forms/signup-reactive-form/components/address-info/address-info.component';
import { FormsDemoComponent } from './forms-demo.component';

@NgModule({
  declarations: [
    SignupFormComponent,
    SignupReactiveFormComponent,
    AddressInfoComponent,
    FormsDemoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ValidatorsModule,
  ],
  providers: [],
  exports: [FormsDemoComponent],
})
export class FormsDemoModule {}
